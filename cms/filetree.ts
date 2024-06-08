import type { Article } from "./article";
import voca from "voca";
import * as path from 'path';
import { readdir, lstat, readFile, writeFile } from 'fs/promises'
import * as article from "./article";
import { deslugify } from "./helpers";
import type { TableRow } from "./table";

export type FileTree = Map<string, Article>

async function processFile(filePath: string, series?: string) {
  try {
    const item = await readFile(filePath, 'utf8');
    return article.init({ series, content: item })
  } catch (e) {
    console.log(e, filePath);
  }
}

async function processDir(tree: FileTree, dirPath: string) {
  const seriesPath = path.parse(dirPath)
  const seriesSlug = seriesPath.name;
  const seriesName = deslugify(seriesSlug);
  const dir = await readdir(dirPath);
  for (const ext of dir) {
    const filePath = path.join(dirPath, ext);
    const processedFile = await processFile(filePath, seriesName);
    const { title } = processedFile.frontmatter;
    tree.set(title, processedFile);
  }
}

export async function create(basePath: string): Promise<FileTree> {
  const dir = await readdir(basePath);
  const tree = new Map;
  for (const ext of dir) {
    const newPath = path.join(basePath, ext);
    const stats = await lstat(newPath)
    if (stats.isDirectory()) {
      console.log("ENTERING DIR: ", ext);
      await processDir(tree, newPath);
    } else {
      const processedFile = await processFile(newPath);
      const { title } = processedFile.frontmatter;
      tree.set(title, processedFile);
    }
  }
  return tree;
}

export async function update(tree: FileTree, tableData: TableRow[]) {
  for (const tableRow of tableData) {
    const { title } = tableRow;
    const entry = tree.get(title);
    if (entry) {
      tree.set(title, await article.update(entry, tableRow))
    }
  }
}

export async function order(tree: FileTree) {
  const seriesIndex = new Map<string, number>;
  for (const [title, entry] of tree) {
    const { series } = entry.frontmatter;
    if (series) {
      const seriesCount = seriesIndex.get(series) || 0;
      tree.set(title, await article.addOrder(entry, seriesCount))
      seriesIndex.set(series, seriesCount + 1);
    }
  }
}


export async function validate(tree: FileTree) {
  for (const [_title, entry] of tree) {
    article.validate(entry);
  }
}

export async function write(basePath: string, tree: FileTree) {
  for (const [title, entry] of tree) {
    const fileName = `${voca.slugify(title)}.md`;
    const filePath = path.join(basePath, fileName);
    const file = article.render(entry);
    await writeFile(filePath, file, 'utf8');
  }
}
