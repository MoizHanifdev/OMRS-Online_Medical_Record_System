import { LoginForm } from './LoginForm';
import { AuthFooter } from '../_components/AuthFooter';

export const metadata = {
  title: 'Sign In - OMRS',
};

export default function LoginPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
        <p className="text-muted-foreground mt-2">Sign in to your OMRS account</p>
      </div>

      <LoginForm />

      <AuthFooter text="Don't have an account?" linkText="Sign up" href="/signup" />
    </>
  );
}
