import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

const Callout = ({ children, type = 'default' }: { children: React.ReactNode, type?: 'default' | 'warning' | 'error' | 'success' }) => {
  const bgClasses = {
    default: 'bg-muted border-l-4 border-muted-foreground',
    warning: 'bg-amber-100 border-l-4 border-amber-500 text-amber-900',
    error: 'bg-red-100 border-l-4 border-red-500 text-red-900',
    success: 'bg-green-100 border-l-4 border-green-500 text-green-900'
  };
  return (
    <div className={`p-4 my-6 rounded-r-lg ${bgClasses[type]}`}>
      {children}
    </div>
  );
};

export const mdxComponents = {
  Callout,
  h1: (props: any) => <h1 className="text-4xl font-bold mt-8 mb-4 tracking-tight" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mt-8 mb-4 tracking-tight" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold mt-6 mb-3 tracking-tight" {...props} />,
  p: (props: any) => <p className="leading-relaxed mb-6 text-muted-foreground" {...props} />,
  a: (props: any) => <a className="text-primary font-medium hover:underline" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-muted-foreground" {...props} />,
  li: (props: any) => <li {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-foreground" {...props} />,
  img: (props: any) => <img className="rounded-xl border border-border shadow-sm my-8" {...props} />,
};

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          keepBackground: true,
        },
      ],
    ],
  },
};

export function MDXContent({ content }: { content: string }) {
  // @ts-ignore
  return <MDXRemote source={content} components={mdxComponents} options={options} />;
}
