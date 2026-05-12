import { getChangelogEntries } from '@/lib/changelog/entries';
import { MDXContent } from '@/components/mdx/MDXComponents';
import { generateMeta } from '@/lib/seo/metadata';

export const metadata = generateMeta({
  title: 'Changelog',
  description: 'New updates and improvements to OMRS.',
  path: '/changelog',
});

export default function ChangelogPage() {
  const entries = getChangelogEntries();

  const typeColors = {
    Feature: 'bg-primary/10 text-primary border-primary/20',
    Improvement: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    Fix: 'bg-amber-500/10 text-amber-500 border-amber-500/20'
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Changelog</h1>
        <p className="text-xl text-muted-foreground mb-16">
          Follow along as we continuously improve OMRS.
        </p>

        <div className="relative border-l-2 border-border ml-4 md:ml-0 pl-8 md:pl-12 space-y-24">
          {entries.map((entry, idx) => (
            <div key={idx} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 rounded-full bg-background border-4 border-primary" />
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="text-sm font-semibold text-muted-foreground">
                  {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${typeColors[entry.type]}`}>
                  {entry.type}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-muted text-foreground border border-border">
                  {entry.version}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">{entry.title}</h2>
              
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <MDXContent content={entry.content} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
