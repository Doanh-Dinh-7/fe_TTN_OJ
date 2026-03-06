import { lazy, Suspense } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/controllers/AuthContext";
import { MainLayout } from "@/layout";
import { ProtectedRoute, GuestOnlyRoute, VerifyEmailRoute } from "@/components";
import { routePaths } from "./routePaths";

const HomePage = lazy(() =>
  import("@/pages/HomePage").then((module) => ({ default: module.HomePage })),
);

const LoginPage = lazy(() =>
  import("@/modules/auth/pages/LoginPage").then((module) => ({
    default: module.LoginPage,
  })),
);

const RegisterPage = lazy(() =>
  import("@/modules/auth/pages/RegisterPage").then((module) => ({
    default: module.RegisterPage,
  })),
);

const ContestListPage = lazy(() =>
  import("@/modules/contest/pages/ContestListPage").then((module) => ({
    default: module.ContestListPage,
  })),
);

const ContestDetailPage = lazy(() =>
  import("@/modules/contest/pages/ContestDetailPage").then((module) => ({
    default: module.ContestDetailPage,
  })),
);

const AdminDashboardPage = lazy(() =>
  import("@/modules/admin/pages/AdminDashboardPage").then((module) => ({
    default: module.AdminDashboardPage,
  })),
);

const AdminSubmissionsPage = lazy(() =>
  import("@/modules/admin/pages/AdminSubmissionsPage").then((module) => ({
    default: module.AdminSubmissionsPage,
  })),
);

const AdminProblemsPage = lazy(() =>
  import("@/modules/admin/pages/AdminProblemsPage").then((module) => ({
    default: module.AdminProblemsPage,
  })),
);

const AdminContestsPage = lazy(() =>
  import("@/modules/admin/pages/AdminContestsPage").then((module) => ({
    default: module.AdminContestsPage,
  })),
);

const AdminUsersPage = lazy(() =>
  import("@/modules/admin/pages/AdminUsersPage").then((module) => ({
    default: module.AdminUsersPage,
  })),
);

function RouteFallback() {
  return (
    <Box display="grid" placeItems="center" minH="40vh">
      <Spinner size="xl" />
    </Box>
  );
}

export function AppRoutes() {
  const { loading } = useAuth();
  if (loading) return null;
  return (
    <Suspense fallback={<RouteFallback />}>
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
    </Suspense>
  );
}
