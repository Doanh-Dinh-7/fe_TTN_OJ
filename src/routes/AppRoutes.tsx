import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/controllers/AuthContext'
import { MainLayout } from '@/layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { HomePage } from '@/pages/HomePage'
import { LoginPage, RegisterPage } from '@/modules/auth'
import { ContestListPage, ContestDetailPage } from '@/modules/contest'
import { routePaths } from './routePaths'

export function AppRoutes() {
  const { loading } = useAuth()
  if (loading) return null
  return (
    <Routes>
      <Route path={routePaths.home} element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="contests" element={<ContestListPage />} />
        <Route
          path="contests/:contestId"
          element={
            <ProtectedRoute>
              <ContestDetailPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to={routePaths.home} replace />} />
    </Routes>
  )
}
