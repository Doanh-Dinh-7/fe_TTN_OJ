/** Route path constants - shared for navigation and route config */
export const routePaths = {
  home: '/',
  login: '/login',
  register: '/register',
  verifyEmail: '/verify-email',
  contests: '/contests',
  contestDetail: (id: string) => `/contests/${id}`,
} as const
