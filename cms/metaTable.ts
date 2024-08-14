import { existsSync } from "fs"
import * as path from 'path';
import { mkdir, readFile, writeFile } from 'fs/promises'
import { ContentType, type Meta } from "./meta/schema";
import * as m from "./meta";

export type MetaTable = Meta[];

const TABLE_FILE_NAME = "contentTable.json";

export async function init(basePath: string) {
  const tablePath = path.join(basePath, TABLE_FILE_NAME);
  const tableExists = existsSync(tablePath);
  if (!tableExists) {
    console.log("CREATING TABLE: ", tablePath);
    await mkdir(basePath, { recursive: true })
    await writeFile(tablePath, JSON.stringify([]), 'utf8');
  }
}

export async function write(basePath: string, table: MetaTable) {
  const tablePath = path.join(basePath, TABLE_FILE_NAME);
  await writeFile(tablePath, JSON.stringify(table, null, 2), 'utf8');
}

export async function read(basePath: string) {
  const tablePath = path.join(basePath, TABLE_FILE_NAME);
  const tableJSON = await readFile(tablePath, 'utf8');
  const raw = JSON.parse(tableJSON) as Meta[];
  const sorted = raw
    .filter(
      ({ contentType, publicationData }) => publicationData && contentType === ContentType.ARTICLE)
    .sort(
      (a, b) => {
        if (b.publicationData!.publishedAt && a.publicationData!.publishedAt) {
          return b.publicationData!.publishedAt > a.publicationData!.publishedAt ? -1 : 0
        } else {
          return -1
        }
      })
  const all = raw.map((meta) => {
    const index = sorted.findIndex(({ id }) => meta.id === id);
    const order = index >= 0 ? index : undefined
    return m.init({ ...meta, order })
  })
  return all;
}
