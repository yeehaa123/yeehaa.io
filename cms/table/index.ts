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
  const table = Array.from(tree).map(([_, { meta }]) => {
    return tr.init({ ...meta });
  })
  await writeFile(tablePath, JSON.stringify(table, null, 2), 'utf8');
}

export function order(tableData: TableRow[]) {
  const publishedInSeries = tableData.reduce(
    (acc: Map<string, TableRow[]>, tableRow: TableRow) => {
      const { series, draft } = tableRow;
      const seriesTitle = series || "NONE";
      if (tableRow) {
        if (!draft) {
          const oldEntries = acc.get(seriesTitle);
          const entries = oldEntries ? [...oldEntries, tableRow] : [tableRow];
          acc.set(seriesTitle, entries);
        }
      }
      return acc
    }, new Map)

  return Array.from(publishedInSeries).flatMap(([_, series]) => {
    return series.sort((a, b) => {
      if (a.publishedAt && b.publishedAt) {
        return a.publishedAt.getTime() - b.publishedAt.getTime();
      } else {
        return -1
      }
    }).map((tableRow, index) => {
      const series = tableRow.series !== "NONE" ? tableRow.series : undefined;
      const order = series ? index : undefined;
      return { ...tableRow, series, order }
    })
  })
}

export async function read(basePath: string) {
  const tablePath = path.join(basePath, TABLE_FILE_NAME);
  const tableJSON = await readFile(tablePath, 'utf8');
  const raw = JSON.parse(tableJSON) as TableRow[];
  const data = raw.map(({ createdAt, draft, updatedAt, publishedAt, ...frontmatter }) => {
    if (!draft && !publishedAt) {
      return tr.init({
        ...frontmatter,
        draft,
        publishedAt: new Date,
        updatedAt: new Date
      })
    } else {
      return tr.init({
        ...frontmatter,
        draft,
        createdAt: new Date(createdAt),
        publishedAt: publishedAt ? new Date(publishedAt) : undefined,
        updatedAt: new Date(updatedAt)
      })
    }
  })
  return order(data);
}

