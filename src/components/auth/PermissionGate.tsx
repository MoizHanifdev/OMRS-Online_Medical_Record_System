import React from 'react';
import { useUser } from '@/hooks/useUser';
import { hasAnyPermission, hasAllPermissions, type Permission } from '@/auth/permissions';

interface PermissionGateProps {
  permissions: Permission[];
  requireAll?: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function PermissionGate({ permissions, requireAll = false, children, fallback = null }: PermissionGateProps) {
  const { user, isAuthenticated } = useUser();

  if (!isAuthenticated || !user) {
    return <>{fallback}</>;
  }

  const hasAccess = requireAll
    ? hasAllPermissions(user.role, permissions)
    : hasAnyPermission(user.role, permissions);

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
