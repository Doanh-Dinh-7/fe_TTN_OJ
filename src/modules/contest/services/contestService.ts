import { apiClient } from '@/services/api'

export interface ContestItem {
  id: string
  name: string
  startTime: string
  endTime: string
  isPublic: boolean
}

export interface ContestDetail {
  id: string
  name: string
  description: string | null
  startTime: string
  endTime: string
  isPublic: boolean
  leaderboardHidden: boolean
  createdAt: string
}

export interface ContestProblem {
  id: string
  title: string
  orderIndex: number
  maxScore: number
}

export const contestService = {
  list: (admin = false): Promise<ContestItem[]> =>
    apiClient
      .get<{ contests: Array<Record<string, unknown>> }>('/contests', { params: { admin: admin ? 1 : 0 } })
      .then((res) =>
        (res.data.contests || []).map((c: Record<string, unknown>) => ({
          id: String(c.id),
          name: String(c.name),
          startTime: String(c.start_time),
          endTime: String(c.end_time),
          isPublic: Boolean(c.is_public),
        }))
      ),

  getById: (contestId: string): Promise<ContestDetail> =>
    apiClient.get<Record<string, unknown>>(`/contests/${contestId}`).then((res) => {
      const d = res.data
      return {
        id: String(d.id),
        name: String(d.name),
        description: d.description != null ? String(d.description) : null,
        startTime: String(d.start_time),
        endTime: String(d.end_time),
        isPublic: Boolean(d.is_public),
        leaderboardHidden: Boolean(d.leaderboard_hidden),
        createdAt: String(d.created_at),
      }
    }),

  getProblems: (contestId: string): Promise<ContestProblem[]> =>
    apiClient
      .get<{ problems: Array<Record<string, unknown>> }>(`/contests/${contestId}/problems`)
      .then((res) =>
        (res.data.problems || []).map((p: Record<string, unknown>) => ({
          id: String(p.id),
          title: String(p.title),
          orderIndex: Number(p.order_index),
          maxScore: Number(p.max_score),
        }))
      ),
}
