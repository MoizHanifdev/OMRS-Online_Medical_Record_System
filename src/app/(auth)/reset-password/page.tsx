import { ResetPasswordForm } from './ResetPasswordForm';

export const metadata = {
  title: 'Reset Password - OMRS',
};

export default function ResetPasswordPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Reset your password</h1>
        <p className="text-muted-foreground mt-2">Choose a strong new password</p>
      </div>
      <ResetPasswordForm />
    </>
  );
}
