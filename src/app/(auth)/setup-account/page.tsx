import { SetupAccountForm } from './SetupAccountForm';

export const metadata = {
  title: 'Setup Account - OMRS',
};

export default function SetupAccountPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Welcome to OMRS</h1>
        <p className="text-muted-foreground mt-2">Set your password to activate your account</p>
      </div>
      <SetupAccountForm />
    </>
  );
}
