import React, { Suspense, lazy } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProtectedRoute from "../components/common/ProtectedRoute";

// Lazy-loaded page components for optimal performance & code-splitting
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const ReadingsPage = lazy(() => import("../pages/ReadingsPage"));
const ReportsPage = lazy(() => import("../pages/ReportsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

// Suspense wrapper helper
const withSuspense = (Component) => (
  <Suspense fallback={<LoadingSpinner text="Loading page..." />}>
    <Component />
  </Suspense>
);

export const routerConfig = [
  // Public Routes (Authentication)
  {
    path: "/login",
    element: withSuspense(LoginPage),
  },
  {
    path: "/register",
    element: withSuspense(RegisterPage),
  },

  // Protected App Routes
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: withSuspense(DashboardPage),
      },
      {
        path: "readings",
        element: withSuspense(ReadingsPage),
      },
      {
        path: "reports",
        element: withSuspense(ReportsPage),
      },
    ],
  },

  // 404 Catch-all Route
  {
    path: "*",
    element: withSuspense(NotFoundPage),
  },
];

export default routerConfig;

