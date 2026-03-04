import type { User } from "@/controllers/AuthContext";

export interface AuthMenuProps {
  user: User | null;
  inHeader?: boolean;
}

export type Status = "idle" | "loading" | "success" | "error";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  username: string;
}

export interface TokenResponse {
  accessToken: string;
  tokenType: string;
  userId: string;
}
