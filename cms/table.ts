import type { FileTree } from "./filetree";
import { readFile, writeFile } from 'fs/promises'

export type TableRow = {
  title: string,
  draft: boolean,
  createdAt: Date,
  publishedAt?: Date
}

export async function write(basePath: string, tree: FileTree) {
  const table = Array.from(tree).map(([title, { frontmatter }]) => {
    return { title, ...frontmatter }
  })
  await writeFile(basePath, JSON.stringify(table, null, 2), 'utf8');
}

export async function read(basePath: string, tree: FileTree) {
  const tableJSON = await readFile(basePath, 'utf8');
  return JSON.parse(tableJSON) as TableRow[]
}
