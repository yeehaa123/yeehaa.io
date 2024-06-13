import type { Frontmatter } from "../frontmatter";
import * as fm from "../frontmatter";

import { z } from 'zod';

export const schema = fm.schema.extend({
  author: z.string(),
  order: z.number().optional(),
  series: z.string().optional(),
  imageURL: z.string(),
  excerpt: z.string(),
  summary: z.string(),
  tags: z.array(z.string()).min(3).max(7),
})

export interface ArticleFrontmatter extends Frontmatter {
  author: string,
  slug?: string | undefined,
  summary: string,
  imageURL: string,
  excerpt: string,
  tags: string[],
}

type FrontmatterInit = Omit<ArticleFrontmatter,
  'draft'
  | 'createdAt'
  | 'updatedAt'
  | 'publishedAt'
  | 'contentType'
>

export function init(
  { title, author, series, imageURL, checksum, summary, tags, excerpt }: FrontmatterInit) {
  return {
    title,
    contentType: "article",
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
export function validate(frontmatter: ArticleFrontmatter) {
  return schema.parse(frontmatter);
}

export function update(frontmatter: ArticleFrontmatter, tableRow: Frontmatter) {
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
