import { useUser } from './useUser';
import type { Role } from '@/lib/constants/roles';

export function useRole(...roles: Role[]) {
  const { user, isAuthenticated } = useUser();

  if (!isAuthenticated || !user) return false;

  return roles.includes(user.role);
}
