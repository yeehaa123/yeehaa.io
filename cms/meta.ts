import { z } from 'zod';
import * as pd from "./publicationData";

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
  author: z.string(),
  title: z.string(),
  contentType: z.nativeEnum(ContentType),
  status: z.nativeEnum(Status),
  order: z.number().optional(),
  series: z.string().optional(),
  checksum: z.string(),
  publicationData: pd.schema.optional(),
  habitat: z.string().optional(),
  course: z.string().optional(),

})

export type Meta = z.infer<typeof schema>

const initSchema = schema.extend({
  status: z.nativeEnum(Status).optional(),
})

export type MetaInit = z.infer<typeof initSchema>

function validate(frontmatter: Meta) {
  return schema.parse(frontmatter);
}
export function init({
  status,
  publicationData,
  ...rest
}: MetaInit) {
  if (status === Status.PUBLISHED) {
    return validate({
      ...rest,
      status,
      publicationData: pd.init(publicationData)
    });
  } else {
    const status = Status.DRAFT;
    return validate({
      ...rest,
      status
    });
  }
}
