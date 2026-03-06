import { apiClient } from "@/services/api";
import { LoginPayload, RegisterPayload } from "../controllers/types";

export const authService = {
  login: (data: LoginPayload) =>
    apiClient
      .post<{
        access_token: string;
        refresh_token: string;
        token_type: string;
        user_id: string;
      }>("/auth/login", data)
      .then((res) => ({
        accessToken: res.data.access_token,
        refreshToken: res.data.refresh_token,
        tokenType: res.data.token_type,
        userId: res.data.user_id,
      })),

  register: (data: RegisterPayload) =>
    apiClient
      .post<{ message: string }>("/auth/register", data)
      .then((res) => res.data),

  verifyEmail: (token: string) =>
    apiClient
      .post<{ message: string }>("/auth/verify-email", { token })
      .then((res) => res.data),

  me: () =>
    apiClient
      .get<{
        id: string;
        email: string;
        username: string;
        verified: boolean;
        role_id: string;
        role: string;
      }>("/auth/me")
      .then((res) => res.data),
};
