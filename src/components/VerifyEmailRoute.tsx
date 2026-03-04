import { Navigate, useSearchParams } from 'react-router-dom'
import { routePaths } from '@/routes/routePaths'
import { VerifyEmailPage } from '@/modules/auth'

/**
 * Chỉ render VerifyEmailPage khi URL có query token (từ link trong email).
 * User không thể chủ động vào /verify-email không có token → redirect về trang chủ.
 */
export function VerifyEmailRoute() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  if (!token) {
    return <Navigate to={routePaths.home} replace />
  }
  return <VerifyEmailPage />
}
