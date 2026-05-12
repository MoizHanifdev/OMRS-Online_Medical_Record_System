import type { Metadata } from 'next';

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const SITE_NAME = 'OMRS';

export function generateMeta(input: PageMetaInput): Metadata {
  const url = `${BASE_URL}${input.path}`;
  const image = input.image || `${BASE_URL}/api/og?title=${encodeURIComponent(input.title)}`;
  
  return {
    title: { absolute: `${input.title} | ${SITE_NAME}` },
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: SITE_NAME,
      type: input.type || 'website',
      images: [{ url: image, width: 1200, height: 630, alt: input.title }],
      publishedTime: input.publishedTime,
      authors: input.author ? [input.author] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [image],
      creator: '@omrshealth',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    },
  };
}
