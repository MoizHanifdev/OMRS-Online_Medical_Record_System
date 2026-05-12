import zxcvbn from 'zxcvbn';

export async function hashPassword(plain: string): Promise<string> {
  const { default: bcrypt } = await import('bcryptjs');
  return bcrypt.hash(plain, 12);
}

export async function comparePassword(plain: string, hash: string): Promise<boolean> {
  const { default: bcrypt } = await import('bcryptjs');
  return bcrypt.compare(plain, hash);
}

export function validatePasswordPolicy(password: string, context: { email?: string; name?: string }) {
  const errors: string[] = [];
  if (password.length < 10) errors.push('At least 10 characters required');
  if (!/[A-Z]/.test(password)) errors.push('At least one uppercase letter required');
  if (!/[a-z]/.test(password)) errors.push('At least one lowercase letter required');
  if (!/\d/.test(password)) errors.push('At least one digit required');
  if (!/[^A-Za-z0-9]/.test(password)) errors.push('At least one special character required');
  
  if (context.email && password.toLowerCase().includes(context.email.split('@')[0]?.toLowerCase() ?? '')) {
    errors.push('Cannot contain your email username');
  }
  if (context.name && password.toLowerCase().includes(context.name.toLowerCase())) {
    errors.push('Cannot contain your name');
  }
  return errors;
}

export function passwordStrength(password: string) {
  const result = zxcvbn(password);
  return { score: result.score, crackTime: result.crack_times_display.offline_slow_hashing_1e4_per_second };
}

// HaveIBeenPwned k-anonymity check using Web Crypto API
export async function isPasswordBreached(password: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();

    const prefix = hash.substring(0, 5);
    const suffix = hash.substring(5);
    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: { 'Add-Padding': 'true' },
    });
    if (!res.ok) return false; // fail open
    const text = await res.text();
    return text.split('\n').some((line) => line.split(':')[0] === suffix);
  } catch {
    return false;
  }
}
