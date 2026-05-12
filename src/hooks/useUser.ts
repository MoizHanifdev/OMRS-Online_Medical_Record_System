import { useSession } from 'next-auth/react';

export function useUser() {
  const { data, status, update } = useSession();
  return {
    user: data?.user ?? null,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    isEmailVerified: data?.user?.isEmailVerified ?? false,
    update,
  };
}
