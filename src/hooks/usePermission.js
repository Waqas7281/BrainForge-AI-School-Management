// src/hooks/usePermission.js

import { useSelector } from "react-redux";

export const usePermission = () => {
  const { permissions, role } = useSelector((state) => state.auth);

  const hasPermission = (permission) => {
    // Super admin has all permissions
    if (role === "super_admin") return true;
    // School admin has all school-level permissions
    if (role === "school_admin" && !permission.startsWith("system"))
      return true;
    // Check specific permission
    return permissions.includes(permission);
  };

  const hasAnyPermission = (permissionList) => {
    return permissionList.some((p) => hasPermission(p));
  };

  const hasAllPermissions = (permissionList) => {
    return permissionList.every((p) => hasPermission(p));
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    role,
    permissions,
  };
};
