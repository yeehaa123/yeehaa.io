import type { FileTree } from "./filetree";
import { readFile, writeFile } from 'fs/promises'
import * as article from "./article";
import type { Frontmatter } from "./frontmatter";

export type TableRow = Pick<Frontmatter,
  'title'
  | 'draft'
  | 'series'
  | 'order'
  | 'author'
  | 'checksum'
  | 'createdAt'
  | 'updatedAt'
  | 'publishedAt'
>

export async function write(basePath: string, tree: FileTree) {
  const publishedInSeries = Array.from(tree).filter(([_, { frontmatter }]) => {
    return frontmatter.series && frontmatter.publishedAt
  }).sort(([_a, a], [_b, b]) => {
    return a.frontmatter.publishedAt.getTime() - b.frontmatter.publishedAt.getTime();
  });

  publishedInSeries.forEach(([title, entry], index) => {
    tree.set(title, article.addOrder(entry, index));
  })

  const table = Array.from(tree).map(([_, { frontmatter }]) => {
    const {
      title,
      series,
      author,
      draft,
      order,
      checksum,
      createdAt,
      updatedAt,
      publishedAt
    } = frontmatter;
    return { title, order, series, author, draft, checksum, createdAt, updatedAt, publishedAt };
  })
  await writeFile(basePath, JSON.stringify(table, null, 2), 'utf8');
}

export async function read(basePath: string) {
  const tableJSON = await readFile(basePath, 'utf8');
  const raw = JSON.parse(tableJSON);
  return raw.map(({ title, order, draft, checksum, createdAt, updatedAt, publishedAt }) => {
    return {
      title,
      order,
      draft,
      checksum,
      createdAt: new Date(createdAt),
      publishedAt: publishedAt ? new Date(publishedAt) : undefined,
      updatedAt: new Date(updatedAt)
    }
  }) as TableRow[]
}
