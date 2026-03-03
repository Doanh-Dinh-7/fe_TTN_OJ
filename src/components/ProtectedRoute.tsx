import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/controllers/AuthContext'
import { routePaths } from '@/routes/routePaths'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) {
    return <Navigate to={routePaths.login} state={{ from: location }} replace />
  }
  if (allowedRoles && allowedRoles.length > 0) {
    const role = user.roleId
    if (!allowedRoles.includes(role)) {
      return <Navigate to={routePaths.home} replace />
    }
  }
  return <>{children}</>
}
