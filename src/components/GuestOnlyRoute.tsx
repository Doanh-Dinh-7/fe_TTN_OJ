import { Navigate } from 'react-router-dom'
import { useAuth } from '@/controllers/AuthContext'
import { routePaths } from '@/routes/routePaths'

/**
 * Chỉ cho phép truy cập khi chưa đăng nhập.
 * Nếu đã đăng nhập thì redirect về trang chủ (tránh user vào lại login/register/verify-email).
 */
export function GuestOnlyRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  if (user) {
    return <Navigate to={routePaths.home} replace />
  }
  return <>{children}</>
}
