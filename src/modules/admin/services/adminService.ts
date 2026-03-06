import { apiClient } from "@/services/api";
import { AdminUser } from "../controllers";

export const adminService = {
  listSubmissions: (params?: {
    contest_id?: string;
    skip?: number;
    limit?: number;
  }) =>
    apiClient
      .get<{
        submissions: Array<Record<string, unknown>>;
      }>("/admin/submissions", { params })
      .then((res) => res.data.submissions),

  createProblem: (data: {
    title: string;
    description?: string;
    max_score?: number;
    time_limit_ms?: number;
    memory_limit_mb?: number;
    language_allowed?: string;
  }) =>
    apiClient
      .post<Record<string, unknown>>("/admin/problems", data)
      .then((res) => res.data),

  addTestCase: (
    problemId: string,
    data: {
      input_data?: string;
      expected_output: string;
      is_sample?: boolean;
      order_index?: number;
    },
  ) =>
    apiClient
      .post<
        Record<string, unknown>
      >(`/admin/problems/${problemId}/test-cases`, data)
      .then((res) => res.data),

  // Admin User Management
  listUsers: (params?: { skip?: number; limit?: number }) =>
    apiClient
      .get<{ users: AdminUser[] }>("/admin/users", { params })
      .then((res) => res.data.users),

  lockUser: (userId: string) =>
    apiClient
      .patch<{ message: string }>(`/admin/users/${userId}/lock`)
      .then((res) => res.data),

  unlockUser: (userId: string) =>
    apiClient
      .patch<{ message: string }>(`/admin/users/${userId}/unlock`)
      .then((res) => res.data),

  setUserRole: (userId: string, role: "admin" | "user") =>
    apiClient
      .patch<{ message: string }>(`/admin/users/${userId}/role`, { role })
      .then((res) => res.data),
};
