import type { FileTree } from "./filetree";
import { readFile, writeFile } from 'fs/promises'
import type { Frontmatter } from "./frontmatter";

export type TableRow = Pick<Frontmatter,
  'title'
  | 'draft'
  | 'checksum'
  | 'createdAt'
  | 'updatedAt'
  | 'publishedAt'
>

export async function write(basePath: string, tree: FileTree) {
  const table = Array.from(tree).map(([_, { frontmatter }]) => {
    const { title, draft, checksum, createdAt, updatedAt, publishedAt } = frontmatter;
    return { title, draft, checksum, createdAt, updatedAt, publishedAt };
  })
  await writeFile(basePath, JSON.stringify(table, null, 2), 'utf8');
}

export async function read(basePath: string) {
  const tableJSON = await readFile(basePath, 'utf8');
  return JSON.parse(tableJSON) as TableRow[]
}
