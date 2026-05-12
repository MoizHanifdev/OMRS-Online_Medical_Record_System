import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const changelogDirectory = path.join(process.cwd(), 'content/changelog');

export interface ChangelogEntry {
  slug: string;
  title: string;
  date: string;
  version: string;
  type: 'Feature' | 'Improvement' | 'Fix';
  content: string;
}

export function getChangelogEntries(): ChangelogEntry[] {
  if (!fs.existsSync(changelogDirectory)) return [];
  
  const files = fs.readdirSync(changelogDirectory).filter(file => file.endsWith('.mdx'));
  
  const entries = files.map(file => {
    const fileContents = fs.readFileSync(path.join(changelogDirectory, file), 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug: file.replace(/\.mdx$/, ''),
      title: data.title,
      date: data.date,
      version: data.version,
      type: data.type,
      content
    };
  });
  
  return entries.sort((a, b) => (a.date > b.date ? -1 : 1));
}
