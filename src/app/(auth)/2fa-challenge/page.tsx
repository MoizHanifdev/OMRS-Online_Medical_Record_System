import { TwoFactorChallenge } from './TwoFactorChallenge';

export const metadata = {
  title: '2FA Challenge - OMRS',
};

export default function TwoFactorChallengePage() {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground">Two-Factor Authentication</h1>
        <p className="text-muted-foreground mt-2">Enter your verification code</p>
      </div>
      <TwoFactorChallenge />
    </>
  );
}
