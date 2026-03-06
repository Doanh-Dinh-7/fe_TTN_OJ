import { apiClient } from "@/services/api";

export interface SubmissionItem {
  id: string;
  problemId: string;
  status: string;
  score: number;
  createdAt: string;
}

export const submissionService = {
  create: (
    contestId: string,
    problemId: string,
    code: string,
    language = "python",
  ) =>
    apiClient
      .post<{
        id: string;
        problem_id: string;
        contest_id: string;
        status: string;
        score: number;
        created_at: string;
      }>("/submissions", {
        contest_id: contestId,
        problem_id: problemId,
        code,
        language,
      })
      .then((res) => ({
        id: res.data.id,
        problemId: res.data.problem_id,
        contestId: res.data.contest_id,
        status: res.data.status,
        score: res.data.score,
        createdAt: res.data.created_at,
      })),

  getById: (submissionId: string) =>
    apiClient
      .get<Record<string, unknown>>(`/submissions/${submissionId}`)
      .then((res) => res.data),

  listMy: (contestId: string, problemId?: string) =>
    apiClient
      .get<{ submissions: Array<Record<string, unknown>> }>("/submissions", {
        params: { contest_id: contestId, problem_id: problemId },
      })
      .then((res) =>
        (res.data.submissions || []).map((s: Record<string, unknown>) => ({
          id: s.id,
          problemId: s.problem_id,
          status: s.status,
          score: s.score,
          createdAt: s.created_at,
        })),
      ),
};
