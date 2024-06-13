import { existsSync } from "fs"
import type { FileTree } from "../filetree";
import * as path from 'path';
import { mkdir, readFile, writeFile } from 'fs/promises'
import type { TableRow } from "../table/tableRow";
import * as tr from "../table/tableRow";

const TABLE_FILE_NAME = "contentTable.json";

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
    return tr.init({ ...frontmatter });
  })
  await writeFile(tablePath, JSON.stringify(table, null, 2), 'utf8');
}

export async function read(basePath: string) {
  const tablePath = path.join(basePath, TABLE_FILE_NAME);
  const tableJSON = await readFile(tablePath, 'utf8');
  const raw = JSON.parse(tableJSON) as TableRow[];
  return raw.map(({ createdAt, updatedAt, publishedAt, ...frontmatter }) => {
    return tr.init({
      ...frontmatter,
      createdAt: new Date(createdAt),
      publishedAt: publishedAt ? new Date(publishedAt) : undefined,
      updatedAt: new Date(updatedAt)
    })
  })
}
