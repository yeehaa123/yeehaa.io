import { z } from 'zod';
import * as pd from "./publicationData";

export enum ContentType {
  ARTICLE = "article",
  COURSE = "course",
  PROFILE = "profile",
  LANDING_PAGE = "landing_page",
  SERIES = "series",
  TAG = "tag"
}

export enum Status {
  DRAFT = "draft",
  DERRIVED = "derrived",
  PUBLISHED = "published"
}

export const schema = z.object({
  id: z.string(),
  author: z.string().optional(),
  order: z.number().optional(),
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
