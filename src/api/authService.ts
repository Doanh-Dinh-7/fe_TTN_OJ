import apiClient from './client'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  password: string
  username: string
}

export interface TokenResponse {
  accessToken: string
  tokenType: string
  userId: string
}

export const authService = {
  login: (data: LoginPayload) =>
    apiClient.post<{ access_token: string; token_type: string; user_id: string }>('/auth/login', data).then((res) => ({
      accessToken: res.data.access_token,
      tokenType: res.data.token_type,
      userId: res.data.user_id,
    })),

  register: (data: RegisterPayload) =>
    apiClient.post<{ access_token: string; token_type: string; user_id: string }>('/auth/register', data).then((res) => ({
      accessToken: res.data.access_token,
      tokenType: res.data.token_type,
      userId: res.data.user_id,
    })),

  me: () => apiClient.get<{ id: string; email: string; username: string; verified: boolean; role_id: string }>('/auth/me').then((res) => res.data),
}
