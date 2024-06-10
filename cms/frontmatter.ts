import type { TableRow } from "./table";

import { z } from 'zod';

export const schema = z.object({
  title: z.string(),
  author: z.string(),
  order: z.number().optional(),
  series: z.string().optional(),
  publishedAt: z.date().optional(),
  imageURL: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  excerpt: z.string(),
  summary: z.string(),
  tags: z.array(z.string()).min(3).max(7),
  draft: z.boolean()
})

export interface Frontmatter {
  title: string,
  author: string,
  summary: string,
  order?: number | undefined,
  slug?: string,
  imageURL: string,
  excerpt: string,
  tags: string[],
  series?: string | undefined,
  draft: boolean,
  checksum: string,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date | undefined
}

type FrontmatterInit = Omit<Frontmatter, 'draft' | 'createdAt' | 'updatedAt' | 'publishedAt'>

export function init(
  { title, author, series, imageURL, checksum, summary, tags, excerpt }: FrontmatterInit) {
  return {
    title,
    author,
    excerpt,
    imageURL,
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
  const { draft, checksum, createdAt, publishedAt, order } = tableRow;
  return {
    ...frontmatter,
    checksum,
    updatedAt: new Date,
    createdAt,
    draft,
    order,
    publishedAt: draft ? undefined : publishedAt ? publishedAt : new Date
  }
}
