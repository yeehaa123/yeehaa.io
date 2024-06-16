import { z } from 'zod';

export enum ContentType {
  ARTICLE = "article",
  COURSE = "course"
}

export enum Status {
  DRAFT = "draft",
  PUBLISHED = "published"
}

export const schema = z.object({
  id: z.string(),
  author: z.string().optional(),
  curator: z.string().optional(),
  title: z.string().optional(),
  goal: z.string().optional(),
  contentType: z.nativeEnum(ContentType),
  status: z.nativeEnum(Status),
  order: z.number().optional(),
  series: z.string().optional(),
  checksum: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().optional(),
})

export type Meta = z.infer<typeof schema>

const initSchema = schema.extend({
  status: z.nativeEnum(Status).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
})
export type MetaInit = z.infer<typeof initSchema>

function validate(frontmatter: Meta) {
  return schema.parse(frontmatter);
}
export function init({
  status,
  createdAt,
  updatedAt,
  publishedAt,
  ...rest
}: MetaInit) {
  if (status === Status.PUBLISHED) {
    const publishStatus = {
      status,
      createdAt: createdAt ? new Date(createdAt) : new Date,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date,
      updatedAt: updatedAt ? new Date(updatedAt) : new Date
    }
    return validate({ ...rest, ...publishStatus });
  } else {
    const publishStatus = {
      status: Status.DRAFT,
      createdAt: new Date,
      updatedAt: new Date,
      publishedAt: undefined,
    };
    return validate({ ...rest, ...publishStatus });
  }
}
