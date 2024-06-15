import type { Meta } from "../meta";
import * as m from "../meta"

import { z } from 'zod';

export const schema = m.schema.extend({
  contentType: z.literal(m.ContentType.ARTICLE),
  order: z.number().optional(),
  series: z.string().optional(),
  imageURL: z.string(),
  excerpt: z.string(),
  summary: z.string(),
  tags: z.array(z.string()).min(3).max(7),
})

export interface ArticleFrontmatter extends Meta {
  slug?: string,
  summary: string,
  imageURL: string,
  excerpt: string,
  tags: string[],
}

export function validate(frontmatter: ArticleFrontmatter) {
  return schema.parse(frontmatter);
}

