import type { TableRow } from "../table/tableRow";
import * as tr from "../table/tableRow";

import { z } from 'zod';

export const schema = tr.schema.omit({ slug: true }).extend({
  contentType: z.literal(tr.ContentType.ARTICLE),
  order: z.number().optional(),
  series: z.string().optional(),
  imageURL: z.string(),
  excerpt: z.string(),
  summary: z.string(),
  tags: z.array(z.string()).min(3).max(7),
})

export interface ArticleFrontmatter extends Omit<TableRow, 'slug'> {
  summary: string,
  imageURL: string,
  excerpt: string,
  tags: string[],
}

export function validate(frontmatter: ArticleFrontmatter) {
  return schema.parse(frontmatter);
}
