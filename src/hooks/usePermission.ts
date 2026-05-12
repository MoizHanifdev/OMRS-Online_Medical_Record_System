import { useUser } from './useUser';
import { hasPermission, type Permission } from '@/auth/permissions';

export function usePermission(permission: Permission) {
  const { user, isAuthenticated } = useUser();

  if (!isAuthenticated || !user) return false;

  return hasPermission(user.role, permission);
}
