import type { TableRow } from "./table";

export interface Frontmatter {
  title: string,
  author: string,
  summary: string,
  tags: string[],
  series?: string,
  draft: boolean,
  checksum: string,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date | undefined
}

type FrontmatterInit = Omit<Frontmatter, 'draft' | 'createdAt' | 'updatedAt' | 'publishedAt'>

export function init(
  { title, author, series, checksum, summary, tags }: FrontmatterInit) {
  return {
    title,
    author,
    summary,
    tags,
    series,
    checksum,
    draft: true,
    createdAt: new Date,
    updatedAt: new Date,
    publishedAt: undefined,
  };
}


export function update(frontmatter: Frontmatter, tableRow: TableRow) {
  const { draft, checksum, createdAt, publishedAt } = tableRow;
  return {
    ...frontmatter,
    checksum,
    updatedAt: new Date,
    createdAt,
    draft,
    publishedAt: draft ? undefined : publishedAt ? publishedAt : new Date
  }
}
