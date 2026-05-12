import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  const staticRoutes = [
    '',
    '/features',
    '/about',
    '/contact',
    '/pricing',
    '/security',
    '/faq',
    '/changelog',
    '/privacy',
    '/terms',
    '/blog'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // In a real app we would read blog slugs and add them here dynamically
  
  return [...staticRoutes];
}
