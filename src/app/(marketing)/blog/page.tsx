import { getAllPosts } from '@/lib/blog/posts';
import { generateMeta } from '@/lib/seo/metadata';
import Link from 'next/link';

export const metadata = generateMeta({
  title: 'Blog',
  description: 'Insights, updates, and thoughts on modernizing healthcare.',
  path: '/blog',
});

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-center">OMRS Blog</h1>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Insights for modern healthcare teams, engineering updates, and product announcements.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center text-4xl">
                    {post.category === 'Engineering' ? '👨‍💻' : '🏥'}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs font-medium text-primary mb-3">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="text-muted-foreground mb-6 line-clamp-3 flex-1">{post.description}</p>
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                    <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full" />
                    <div className="text-sm">
                      <p className="font-semibold">{post.author}</p>
                      <p className="text-muted-foreground text-xs">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
