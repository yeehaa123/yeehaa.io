import type { FileTree } from "./filetree";
import { readFile, writeFile } from 'fs/promises'

export type TableRow = {
  title: string,
  draft: boolean,
  checksum: string,
  createdAt: Date,
  updatedAt: Date,
  publishedAt?: Date
}

export async function write(basePath: string, tree: FileTree) {
  const table = Array.from(tree).map(([_, { frontmatter }]) => frontmatter);
  await writeFile(basePath, JSON.stringify(table, null, 2), 'utf8');
}

export async function read(basePath: string) {
  const tableJSON = await readFile(basePath, 'utf8');
  return JSON.parse(tableJSON) as TableRow[]
}
