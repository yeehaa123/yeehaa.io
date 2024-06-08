import type { TableRow } from "./table";

export type Frontmatter = {
  title: string,
  author: string,
  series?: string,
  draft: boolean,
  checksum: string,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date | undefined
}

export function init({ title, series, checksum }: { title: string, series?: string, checksum: string }) {
  return {
    title,
    series,
    checksum,
    author: "Yeehaa",
    draft: true,
    createdAt: new Date,
    updatedAt: new Date,
    publishedAt: undefined,
  };
}

export function update(frontmatter: Frontmatter, tableRow: TableRow) {
  const { draft, checksum, createdAt, updatedAt, publishedAt } = tableRow;
  const isUpdated = frontmatter.checksum !== checksum;
  return {
    ...frontmatter,
    checksum,
    updatedAt: isUpdated ? new Date : updatedAt,
    createdAt,
    draft,
    publishedAt: draft ? undefined : publishedAt ? publishedAt : new Date
  }
}
