import { z } from 'zod';
import voca from "voca";

export enum ContentType {
  ARTICLE = "article",
  COURSE = "course"
}

export const schema = z.object({
  title: z.string(),
  author: z.string(),
  slug: z.string(),
  contentType: z.nativeEnum(ContentType),
  draft: z.boolean(),
  order: z.number().optional(),
  series: z.string().optional(),
  checksum: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().optional(),
})

export interface TableRow {
  title: string,
  author: string,
  contentType: string,
  slug: string,
  draft: boolean,
  order?: number | undefined,
  series?: string | undefined,
  checksum: string,
  createdAt: Date,
  updatedAt: Date,
  publishedAt?: Date | undefined
}

interface TableRowInit {
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

function validate(frontmatter: TableRow): TableRow {
  return schema.parse(frontmatter);
}
export function init({
  title,
  author,
  order,
  series,
  contentType,
  draft,
  checksum,
  createdAt,
  updatedAt,
  publishedAt
}: TableRowInit) {
  const frontmatter = {
    title,
    author,
    slug: `${voca.slugify(title)}`,
    order,
    series,
    contentType,
    checksum,
    draft: draft === false ? false : true,
    createdAt: createdAt || new Date,
    updatedAt: updatedAt || new Date,
    publishedAt: publishedAt || undefined,
  };
  return validate(frontmatter);
}

export function update(tableRow: TableRow) {
  const { draft, publishedAt } = tableRow;
  const meta = init({
    ...tableRow,
    updatedAt: new Date,
    publishedAt: draft ? undefined : publishedAt ? publishedAt : new Date
  })
  return schema.parse(meta);
}
