export interface ContestItem {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  isPublic: boolean;
}

export interface ContestDetail {
  id: string;
  name: string;
  description: string | null;
  startTime: string;
  endTime: string;
  isPublic: boolean;
  leaderboardHidden: boolean;
  createdAt: string;
}

export interface ContestProblem {
  id: string;
  title: string;
  orderIndex: number;
  maxScore: number;
}
