import { UAParser } from 'ua-parser-js';
import geoip from 'geoip-lite';
import crypto from 'crypto';

export function parseDevice(req: any) {
  const userAgent = req.headers?.get('user-agent') || req.headers?.['user-agent'] || '';
  const parser = new UAParser(userAgent);
  const result = parser.getResult();
  return {
    browser: `${result.browser.name || 'Unknown'} ${result.browser.version || ''}`.trim(),
    os: `${result.os.name || 'Unknown'} ${result.os.version || ''}`.trim(),
    deviceType: result.device.type || 'desktop',
    userAgent,
  };
}

export function getLocation(ip: string) {
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip === 'unknown') {
    return { country: 'Local', region: '', city: 'Localhost', coordinates: [0, 0] };
  }
  try {
    const geo = geoip.lookup(ip);
    if (!geo) return { country: 'Unknown', region: 'Unknown', city: 'Unknown', coordinates: [0, 0] };
    return {
      country: geo.country,
      region: geo.region,
      city: geo.city,
      coordinates: geo.ll, // [latitude, longitude]
    };
  } catch (err) {
    return { country: 'Unknown', region: 'Unknown', city: 'Unknown', coordinates: [0, 0] };
  }
}

export function getDeviceFingerprint(req: any) {
  const ua = req.headers?.get('user-agent') || req.headers?.['user-agent'] || '';
  const lang = req.headers?.get('accept-language') || req.headers?.['accept-language'] || '';
  // In a real app we'd also include screen res passed from client side via a custom header
  return crypto.createHash('sha256').update(`${ua}-${lang}`).digest('hex');
}
