import type { TableRow } from "./table";

export type Frontmatter = {
  author: string,
  series?: string,
  draft: boolean,
  createdAt: Date,
  publishedAt: Date | undefined
}

export function init({ series }: { series?: string }) {
  return {
    series,
    author: "Yeehaa",
    draft: true,
    createdAt: new Date,
    publishedAt: undefined,
  };
}

export function update(frontmatter: Frontmatter, tableRow: TableRow) {
  const { draft, createdAt, publishedAt } = tableRow;
  return {
    ...frontmatter,
    createdAt,
    draft,
    publishedAt: draft ? undefined : publishedAt ? publishedAt : new Date
  }
}
