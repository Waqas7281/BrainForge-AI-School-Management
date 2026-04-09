// src/components/common/RouteGuard.jsx

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Role-specific base paths
const roleBasePaths = {
  super_admin: ["/super-admin"],
  school_admin: [
    "/dashboard",
    "/students",
    "/teachers",
    "/staff",
    "/classes",
    "/subjects",
    "/attendance",
    "/exams",
    "/fees",
    "/accounts",
    "/salary",
    "/timetable",
    "/communication",
    "/events",
    "/announcements",
    "/reports",
    "/certificates",
    "/settings",
    "/whatsapp",
    "/ai-assistant",
  ],
  teacher: ["/teacher"],
  parent: ["/parent"],
  accountant: ["/accountant"],
  staff: ["/staff"],
};

export default function RouteGuard({ children }) {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const currentPath = window.location.pathname;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if current path is allowed for this role
  const allowedPaths = roleBasePaths[role] || [];
  const isAllowed = allowedPaths.some(
    (path) => currentPath === path || currentPath.startsWith(path + "/"),
  );

  if (!isAllowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
