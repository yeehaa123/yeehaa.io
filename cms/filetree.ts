import type { Article } from "./article";
import type { TableRow } from "./table";
import type { Tag, RenderableTreeNode } from '@markdoc/markdoc';
import voca from "voca";
import Markdoc from '@markdoc/markdoc';
import * as path from 'path';
import { readdir, lstat, readFile, writeFile } from 'fs/promises'
import * as article from "./article";
import * as frontmatter from "./frontmatter";
import { deslugify } from "./helpers";

export type FileTree = Map<string, Article>

function isTag(node: RenderableTreeNode): node is Tag {
  return (node as Tag).name !== undefined;
}

function collectTitle(node: RenderableTreeNode, sections = []): string {
  if (node && isTag(node)) {
    if (node.name.match(/h1/)) {
      const title = node.children[0];
      return title as string;
    }
    if (node.children) {
      for (const child of node.children) {
        return collectTitle(child, sections);
      }
    }
  }
}

async function processFile(filePath: string, series?: string) {
  try {
    const item = await readFile(filePath, 'utf8');
    const ast = Markdoc.parse(item);
    const content = Markdoc.transform(ast);
    const title = collectTitle(content);
    return article.init({ title, series, content: item })
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
    tree.set(processedFile.title, processedFile);
  }
  return tree
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
      tree.set(processedFile.title, processedFile);
    }
  }
  return tree;
}

export async function update(tree: FileTree, tableData: TableRow[]) {
  for (const tableRow of tableData) {
    const { title } = tableRow;
    const oldEntry = tree.get(title);
    const entry = article.update(
      oldEntry,
      frontmatter.update(oldEntry.frontmatter, tableRow)
    )
    tree.set(
      title,
      entry
    )
  }
}

export async function write(basePath: string, tree: FileTree) {
  for (const [title, entry] of tree) {
    const fileName = `${voca.slugify(title)}.md`;
    const filePath = path.join(basePath, fileName);
    const file = article.render(entry);
    writeFile(filePath, file, 'utf8');
  }
}
