import type { TableRow } from "./table";

import { z } from 'zod';

export const schema = z.object({
  title: z.string(),
  author: z.string(),
  publishedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  excerpt: z.string(),
  summary: z.string(),
  tags: z.array(z.string()),
  draft: z.nullable(z.boolean()),
})

export interface Frontmatter {
  title: string,
  author: string,
  summary: string,
  excerpt: string,
  tags: string[],
  series?: string,
  draft: boolean,
  checksum: string,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date | undefined
}

type FrontmatterInit = Omit<Frontmatter, 'draft' | 'createdAt' | 'updatedAt' | 'publishedAt'>

export function init(
  { title, author, series, checksum, summary, tags, excerpt }: FrontmatterInit) {
  return {
    title,
    author,
    excerpt,
    summary,
    tags,
    series,
    checksum,
    draft: true,
    createdAt: new Date,
    updatedAt: new Date,
    publishedAt: undefined,
  };
}
export function validate(frontmatter: Frontmatter) {
  return schema.parse(frontmatter);
}

export function update(frontmatter: Frontmatter, tableRow: TableRow) {
  const { draft, checksum, createdAt, publishedAt } = tableRow;
  return {
    ...frontmatter,
    checksum,
    updatedAt: new Date,
    createdAt,
    draft,
    publishedAt: draft ? undefined : publishedAt ? publishedAt : new Date
  }
}
