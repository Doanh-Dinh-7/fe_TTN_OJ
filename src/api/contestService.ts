import apiClient from './client'

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
  list: (admin = false) =>
    apiClient
      .get<{ contests: Array<Record<string, unknown>> }>('/contests', { params: { admin: admin ? 1 : 0 } })
      .then((res) =>
        (res.data.contests || []).map((c: Record<string, unknown>) => ({
          id: c.id,
          name: c.name,
          startTime: c.start_time,
          endTime: c.end_time,
          isPublic: c.is_public,
        }))
      ),

  getById: (contestId: string) =>
    apiClient.get<Record<string, unknown>>(`/contests/${contestId}`).then((res) => {
      const d = res.data
      return {
        id: d.id,
        name: d.name,
        description: d.description,
        startTime: d.start_time,
        endTime: d.end_time,
        isPublic: d.is_public,
        leaderboardHidden: d.leaderboard_hidden,
        createdAt: d.created_at,
      }
    }),

  getProblems: (contestId: string) =>
    apiClient
      .get<{ problems: Array<Record<string, unknown>> }>(`/contests/${contestId}/problems`)
      .then((res) =>
        (res.data.problems || []).map((p: Record<string, unknown>) => ({
          id: p.id,
          title: p.title,
          orderIndex: p.order_index,
          maxScore: p.max_score,
        }))
      ),
}
