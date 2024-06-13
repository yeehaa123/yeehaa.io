import type { TableRow } from "../table/tableRow";
import * as tr from "../table/tableRow";

import { z } from 'zod';

export const schema = tr.schema.extend({
  contentType: z.literal(tr.ContentType.ARTICLE),
  author: z.string(),
  order: z.number().optional(),
  series: z.string().optional(),
  imageURL: z.string(),
  excerpt: z.string(),
  summary: z.string(),
  tags: z.array(z.string()).min(3).max(7),
})

export interface ArticleFrontmatter extends TableRow {
  author: string,
  slug?: string | undefined,
  summary: string,
  imageURL: string,
  excerpt: string,
  tags: string[],
}

type TableRowInit = Omit<ArticleFrontmatter,
  'draft'
  | 'createdAt'
  | 'updatedAt'
  | 'publishedAt'
  | 'contentType'
>

export function init(
  { title, author, series, imageURL, checksum, summary, tags, excerpt }: TableRowInit) {
  const frontmatter = tr.init({
    title,
    contentType: "article",
    series,
    checksum,
  })
  return {
    ...frontmatter,
    author,
    excerpt,
    imageURL,
    summary,
    tags,
  };
}
export function validate(frontmatter: ArticleFrontmatter) {
  return schema.parse(frontmatter);
}

export function update(frontmatter: ArticleFrontmatter, tableRow: TableRow) {
  const { draft, publishedAt } = tableRow;
  return schema.parse({
    ...frontmatter,
    ...tr.init({
      ...frontmatter,
      ...tableRow,
      updatedAt: new Date,
      publishedAt: draft ? undefined : publishedAt ? publishedAt : new Date
    })
  })
}
