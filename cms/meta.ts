import { z } from 'zod';

export enum ContentType {
  ARTICLE = "article",
  COURSE = "course"
}

export const schema = z.object({
  title: z.string(),
  author: z.string(),
  contentType: z.nativeEnum(ContentType),
  draft: z.boolean(),
  order: z.number().optional(),
  series: z.string().optional(),
  checksum: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().optional(),
})

export interface Meta {
  title: string,
  author: string,
  contentType: string,
  draft: boolean,
  order?: number | undefined,
  series?: string | undefined,
  checksum: string,
  createdAt: Date,
  updatedAt: Date,
  publishedAt?: Date | undefined
}

interface MetaInit {
  title: string,
  author: string,
  contentType: string,
  checksum: string,
  draft?: boolean,
  order?: number | undefined,
  series?: string | undefined,
  createdAt?: Date,
  updatedAt?: Date,
  publishedAt?: Date | undefined
}

function validate(frontmatter: Meta) {
  return schema.parse(frontmatter);
}
export function init({
  draft,
  createdAt,
  updatedAt,
  publishedAt,
  ...rest
}: MetaInit) {
  if (draft === false) {
    const publishStatus = {
      draft: false,
      createdAt: createdAt ? new Date(createdAt) : new Date,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date,
      updatedAt: updatedAt ? new Date(updatedAt) : new Date
    }
    return validate({ ...rest, ...publishStatus });
  } else {
    const publishStatus = {
      draft: true,
      createdAt: new Date,
      updatedAt: new Date,
      publishedAt: undefined,
    };
    return validate({ ...rest, ...publishStatus });
  }
}
