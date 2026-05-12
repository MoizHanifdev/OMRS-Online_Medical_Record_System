import { AuditLog } from '@/lib/models/AuditLog';

export async function computeRiskScore(user: any, currentIp: string, currentFingerprint: string): Promise<number> {
  let score = 0;

  // Find last successful login
  const lastLogin = await AuditLog.findOne({
    userId: user._id.toString(),
    action: 'LOGIN',
  }).sort({ createdAt: -1 });

  if (lastLogin) {
    // Basic heuristics
    if (lastLogin.ipAddress !== currentIp) score += 20;
    if (lastLogin.metadata?.fingerprint && lastLogin.metadata.fingerprint !== currentFingerprint) score += 20;
  }

  // Failed attempts in last 24h
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recentFailures = await AuditLog.countDocuments({
    userId: user._id.toString(),
    action: 'LOGIN_FAILED',
    createdAt: { $gt: yesterday }
  });
  score += Math.min(recentFailures * 5, 30);

  return score;
}
