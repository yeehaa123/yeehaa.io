import { z } from 'zod';
import * as pd from "./publicationData";
import * as filters from "./filters"

export { filters }
export enum ContentType {
  ARTICLE = "article",
  COURSE = "course",
  PROFILE = "profile"
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

export function validate(frontmatter: Meta) {
  return schema.parse(frontmatter);
}

export function associate(meta: Meta, other: Meta) {
  if (filters.isHabitat(meta, other)) {
    return {
      ...meta,
      course: meta.title
    }
  }
  if (filters.hasHabitat(meta, other)) {
    return {
      ...meta,
      habitat: meta.title
    }
  }
  return false;
}

export function init({ status, publicationData, ...rest }: MetaInit) {
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
