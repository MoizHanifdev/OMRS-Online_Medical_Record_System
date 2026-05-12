import Link from 'next/link';

export function AuthFooter({ text, linkText, href }: { text: string; linkText: string; href: string }) {
  return (
    <p className="mt-8 text-center text-sm text-muted-foreground">
      {text}{' '}
      <Link href={href} className="font-semibold text-primary hover:text-primary/80 transition-colors">
        {linkText}
      </Link>
    </p>
  );
}
