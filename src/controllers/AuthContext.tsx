import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { authService } from '@/modules/auth/services/authService'

export interface User {
  id: string
  email: string
  username: string
  verified: boolean
  roleId: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  register: (email: string, password: string, username: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      setLoading(false)
      return
    }
    try {
      const me = await authService.me()
      setUser({
        id: me.id,
        email: me.email,
        username: me.username,
        verified: me.verified,
        roleId: me.role_id,
      })
    } catch {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  useEffect(() => {
    const onLogout = () => {
      setUser(null)
    }
    window.addEventListener('auth:logout', onLogout)
    return () => window.removeEventListener('auth:logout', onLogout)
  }, [])

  const login = useCallback(
    async (username: string, password: string) => {
      const res = await authService.login({ username, password })
      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)
      await loadUser()
    },
    [loadUser]
  )

  const register = useCallback(async (email: string, password: string, username: string) => {
    await authService.register({ email, password, username })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null)
    window.dispatchEvent(new Event('auth:logout'))
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
