import { lazy } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { routePaths } from "@/routes/routePaths";

const VerifyEmailPage = lazy(() =>
  import("@/modules/auth/pages/VerifyEmailPage").then((module) => ({
    default: module.VerifyEmailPage,
  })),
);

/**
 * Chỉ render VerifyEmailPage khi URL có query token (từ link trong email).
 * User không thể chủ động vào /verify-email không có token → redirect về trang chủ.
 */
export function VerifyEmailRoute() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  if (!token) {
    return <Navigate to={routePaths.home} replace />;
  }
  return <VerifyEmailPage />;
}
