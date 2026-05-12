import { signIn, signOut } from 'next-auth/react';
import { toast } from 'sonner';

export function useAuth() {
  const login = async (credentials: any, callbackUrl?: string) => {
    try {
      const result: any = await signIn('credentials', {
        redirect: false,
        ...credentials,
      });

      if (result?.error) {
        toast.error(result.error);
        return { error: result.error };
      }

      if (result?.ok) {
        toast.success('Signed in successfully');
        if (callbackUrl) {
          window.location.href = callbackUrl;
        }
        return { ok: true };
      }
    } catch (err: any) {
      toast.error(err.message || 'An error occurred during sign in');
      return { error: err.message };
    }
  };

  const logout = async (callbackUrl: string = '/login') => {
    await signOut({ callbackUrl });
  };

  const signup = async (data: any) => {
    try {
      const res = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error?.message || 'Signup failed');
      }
      return { ok: true, data: json.data };
    } catch (err: any) {
      toast.error(err.message);
      return { error: err.message };
    }
  };

  return { login, logout, signup };
}
