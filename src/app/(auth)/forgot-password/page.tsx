import { AuthFooter } from '../_components/AuthFooter';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export const metadata = {
  title: 'Forgot Password - OMRS',
};

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Forgot password?</h1>
        <p className="text-muted-foreground mt-2">Enter your email and we&apos;ll send you a reset link</p>
      </div>

      <ForgotPasswordForm />

      <AuthFooter text="Remember your password?" linkText="Back to login" href="/login" />
    </>
  );
}
