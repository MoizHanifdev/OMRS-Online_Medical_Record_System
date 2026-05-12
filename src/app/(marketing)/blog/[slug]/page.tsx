import { getPostBySlug, getPostSlugs } from '@/lib/blog/posts';
import { MDXContent } from '@/components/mdx/MDXComponents';
import { generateMeta } from '@/lib/seo/metadata';
import { ReadingProgressBar } from '../_components/ReadingProgressBar';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug: slug.replace(/\.mdx$/, '') }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  return generateMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
    author: post.author,
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  return (
    <>
      <ReadingProgressBar />
      <article className="pt-32 pb-24 min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to blog
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-2 text-sm font-medium text-primary mb-4">
              <span>{post.category}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
              <span>•</span>
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{post.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{post.description}</p>
            <div className="flex items-center gap-4">
              <img src={post.authorAvatar} alt={post.author} className="w-12 h-12 rounded-full border border-border" />
              <div>
                <p className="font-bold">{post.author}</p>
                <p className="text-sm text-muted-foreground">OMRS Team</p>
              </div>
            </div>
          </header>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <MDXContent content={post.content} />
          </div>

          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex justify-between items-center">
              <div className="font-medium">Share this article</div>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </button>
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                  <span className="sr-only">Copy Link</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                </button>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </>
  );
}
