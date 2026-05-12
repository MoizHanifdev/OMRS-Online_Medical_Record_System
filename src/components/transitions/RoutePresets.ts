export const presets = {
  default: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  marketing: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4 },
  },
  auth: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.25 },
  },
  modal: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 },
  },
};

export function getRoutePreset(pathname: string) {
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    return presets.auth;
  }
  if (pathname === '/' || pathname.startsWith('/features') || pathname.startsWith('/pricing')) {
    return presets.marketing;
  }
  return presets.default;
}
