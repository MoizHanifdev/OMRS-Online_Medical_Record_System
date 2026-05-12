import React from 'react';
import { useRole } from '@/hooks/useRole';
import type { Role } from '@/lib/constants/roles';

interface RoleGateProps {
  roles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGate({ roles, children, fallback = null }: RoleGateProps) {
  const hasAccess = useRole(...roles);

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
