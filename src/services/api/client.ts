/**
 * Centralized Axios instance. Never call API directly inside UI components.
 * Khi 401: chỉ thử refresh token khi tab đang active (visibilityState === 'visible').
 */
import axios, { type InternalAxiosRequestConfig } from "axios";

type RequestConfigWithRetry = InternalAxiosRequestConfig & { _retry?: boolean };

const baseURL = (() => {
  const url = (import.meta.env.VITE_API_URL as string) || "";
  return url;
})();

const apiClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const REFRESH_ENDPOINT = "/auth/refresh";
const AUTH_LOGOUT = "auth:logout";

function clearTokens(): void {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

function dispatchLogout(): void {
  window.dispatchEvent(new Event(AUTH_LOGOUT));
}

/** Chỉ refresh khi tab đang active. Gọi bằng axios trực tiếp để không gửi access token. */
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;
  try {
    const res = await axios.post<{ access_token: string }>(
      `${baseURL}${REFRESH_ENDPOINT}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
        timeout: 15000,
      },
    );
    return res.data.access_token ?? null;
  } catch {
    return null;
  }
}

let refreshingPromise: Promise<string | null> | null = null;

apiClient.interceptors.request.use((config: RequestConfigWithRetry) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config as RequestConfigWithRetry | undefined;
    if (err.response?.status !== 401) {
      return Promise.reject(err);
    }
    if (!originalConfig) {
      return Promise.reject(err);
    }
    // Đã thử retry rồi thì không retry nữa
    if (originalConfig._retry) {
      clearTokens();
      dispatchLogout();
      return Promise.reject(err);
    }
    // Chỉ refresh khi người dùng đang dùng trang (tab visible)
    if (document.visibilityState !== "visible") {
      clearTokens();
      dispatchLogout();
      return Promise.reject(err);
    }
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      clearTokens();
      dispatchLogout();
      return Promise.reject(err);
    }
    if (!refreshingPromise) {
      refreshingPromise = refreshAccessToken().finally(() => {
        refreshingPromise = null;
      });
    }
    const newToken = await refreshingPromise;
    if (!newToken) {
      clearTokens();
      dispatchLogout();
      return Promise.reject(err);
    }
    localStorage.setItem("accessToken", newToken);
    originalConfig._retry = true;
    originalConfig.headers.Authorization = `Bearer ${newToken}`;
    return apiClient.request(originalConfig);
  },
);

export default apiClient;
