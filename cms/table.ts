import { existsSync } from "fs"
import type { FileTree } from "./filetree";
import * as path from 'path';
import { mkdir, readFile, writeFile } from 'fs/promises'
import type { Frontmatter } from "./frontmatter";

const TABLE_FILE_NAME = "contentTable.json";

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

export async function init(basePath: string) {
  const tablePath = path.join(basePath, TABLE_FILE_NAME);
  try {
    const tableExists = existsSync(tablePath);
    if (!tableExists) {
      console.log("CREATING TABLE: ", tablePath);
      await mkdir(basePath, { recursive: true })
      await writeFile(tablePath, JSON.stringify([]), 'utf8');
    }
  }
  catch (e) {
    console.log(e);
  }
}


export async function write(basePath: string, tree: FileTree) {
  const tablePath = path.join(basePath, TABLE_FILE_NAME);
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
  await writeFile(tablePath, JSON.stringify(table, null, 2), 'utf8');
}

export async function read(basePath: string) {
  const tablePath = path.join(basePath, TABLE_FILE_NAME);
  const tableJSON = await readFile(tablePath, 'utf8');
  const raw = JSON.parse(tableJSON) as TableRow[];
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
