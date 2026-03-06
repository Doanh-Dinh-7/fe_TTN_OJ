import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/controllers/AuthContext";
import { MainLayout } from "@/layout";
import { ProtectedRoute, GuestOnlyRoute, VerifyEmailRoute } from "@/components";
import { HomePage } from "@/pages/HomePage";
import {
  AdminDashboardPage,
  AdminContestsPage,
  AdminProblemsPage,
  AdminSubmissionsPage,
  AdminUsersPage,
} from "@/modules/admin";
import { LoginPage, RegisterPage } from "@/modules/auth";
import { ContestListPage, ContestDetailPage } from "@/modules/contest";
import { routePaths } from "./routePaths";

export function AppRoutes() {
  const { loading } = useAuth();
  if (loading) return null;
  return (
    <Routes>
      <Route path={routePaths.home} element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="login"
          element={
            <GuestOnlyRoute>
              <LoginPage />
            </GuestOnlyRoute>
          }
        />
        <Route
          path="register"
          element={
            <GuestOnlyRoute>
              <RegisterPage />
            </GuestOnlyRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <GuestOnlyRoute>
              <VerifyEmailRoute />
            </GuestOnlyRoute>
          }
        />
        <Route path="contests" element={<ContestListPage />} />
        <Route
          path="contests/:contestId"
          element={
            <ProtectedRoute>
              <ContestDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/submissions"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminSubmissionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/problems"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminProblemsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/contests"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminContestsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminUsersPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to={routePaths.home} replace />} />
    </Routes>
  );
}
