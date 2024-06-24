import { z } from 'zod';
import * as pd from "./publicationData";

export enum ContentType {
  ARTICLE = "article",
  COURSE = "course",
  PROFILE = "profile",
  SERIES = "series"
}

export enum Status {
  DRAFT = "draft",
  PUBLISHED = "published"
}

export const schema = z.object({
  id: z.string(),
  author: z.string(),
  title: z.string(),
  contentType: z.nativeEnum(ContentType),
  status: z.nativeEnum(Status),
  series: z.string().optional(),
  checksum: z.string(),
  publicationData: pd.schema.optional(),
  habitat: z.string().optional(),
})

export const initSchema = schema.extend({
  status: z.nativeEnum(Status).optional(),
})

export type Meta = z.infer<typeof schema>

export type MetaInit = z.infer<typeof initSchema>
