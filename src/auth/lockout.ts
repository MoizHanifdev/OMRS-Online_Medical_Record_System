import { AuditLog } from '@/lib/models/AuditLog';
import { parseDevice, getLocation } from './device';

export async function isAccountLocked(user: any): Promise<boolean> {
  if (user.lockedUntil && user.lockedUntil > new Date()) {
    return true;
  }
  return false;
}

export async function recordLoginAttempt(user: any, success: boolean, req: any) {
  const ip = req?.headers?.get('x-forwarded-for') || req?.ip || 'unknown';
  const device = parseDevice(req);
  const location = getLocation(ip);

  if (success) {
    user.failedLoginAttempts = 0;
    user.lockedUntil = undefined;
    await user.save();
    
    await AuditLog.create({
      userId: user._id.toString(),
      userEmail: user.email,
      userRole: user.role,
      action: 'LOGIN',
      ipAddress: ip,
      userAgent: device.userAgent,
      metadata: { device, location },
      severity: 'INFO',
    });
  } else {
    user.failedLoginAttempts += 1;
    if (user.failedLoginAttempts >= 5) {
      user.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
    }
    await user.save();

    await AuditLog.create({
      userId: user._id.toString(),
      userEmail: user.email,
      userRole: user.role,
      action: 'LOGIN_FAILED',
      ipAddress: ip,
      userAgent: device.userAgent,
      metadata: { device, location, attempts: user.failedLoginAttempts },
      severity: user.failedLoginAttempts >= 5 ? 'WARNING' : 'INFO',
    });
  }
}
