import { z } from "zod";
import type { AnalyzedEntity } from "./entity";
import { curatorSchema } from "@/offcourse/schema";

export const schema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  summary: z.string().optional(),
  excerpt: z.string().optional(),
  tags: z.array(z.string()).optional(),
  alias: z.string().optional(),
  publishedAt: z.date(),
  profile: curatorSchema.optional()
})

export type Association = z.infer<typeof schema>

export function init(initial: AnalyzedEntity): Association {
  const { meta, analysis } = initial;
  const { id, title, publicationData } = meta;
  return schema.parse({ id, title, publishedAt: publicationData!.publishedAt, ...analysis });
}
