import { z } from "zod";
import type { AnalyzedEntity } from "./entity";

export const schema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  description: z.string().optional(),
  summary: z.string().optional(),
  excerpt: z.string().optional(),
  tags: z.array(z.string()).optional()
})

export type Association = z.infer<typeof schema>

export function init(initial: AnalyzedEntity): Association {
  const { meta, analysis } = initial;
  const { id, title, author } = meta;
  return schema.parse({ id, title, author, ...analysis });
}
