import type { BaseArticle } from "./article";
import type { CourseEntity } from "./course";
import type { TableRow } from "./table/tableRow";
import { ContentType } from "./table/tableRow";
import * as tr from "./table/tableRow";
import * as path from 'path';
import { readdir, copyFile, lstat, readFile } from 'fs/promises'
import * as article from "./article";
import * as course from "./course";
import { deslugify } from "./helpers";

type Entity = CourseEntity | BaseArticle;

function isArticle(entity: Entity): entity is BaseArticle {
  return (entity as BaseArticle).meta.contentType === ContentType.ARTICLE;;
}

function isCourse(entity: Entity): entity is CourseEntity {
  return (entity as CourseEntity).meta.contentType === ContentType.COURSE;;
}

export type FileTree = Map<string, Entity>

async function processFile(filePath: string, series?: string) {
  try {
    const { ext } = path.parse(filePath);
    const item = await readFile(filePath, 'utf8');
    if (ext === ".md") {
      return article.init({ series, content: item })
    } else if (ext === '.offcourse') {
      return await course.init({ content: item })
    }
    return false;
  } catch (e) {
    throw (e);
  }
}

function set(tree: FileTree, entry: Entity | false) {
  if (entry) {
    const { title } = entry.meta;
    tree.set(title, entry);
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
    set(tree, processedFile);
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
      set(tree, processedFile);
    }
  }
  return tree;
}

export async function update(tree: FileTree, tableData: TableRow[]) {
  for (const tableRow of tableData) {
    const { title } = tableRow;
    const entry = tree.get(title);
    if (entry) {
      set(tree, {
        ...entry,
        meta: tr.update(tableRow)
      });
    }
  }
}

export async function write(basePath: string, tree: FileTree) {
  for (const [_title, entry] of tree) {
    const { checksum, draft, slug } = entry.meta;
    if (!draft) {
      if (isArticle(entry)) {
        const imgSrc = path.join('./.cache', `${checksum}.png`);
        const imgDest = path.join(basePath, `${checksum}.png`);
        await copyFile(imgSrc, imgDest);
        const augmented = await article.augment(entry);
        await article.write(basePath, augmented);
      } else if (isCourse(entry)) {
        const filePath = path.join(basePath, `${slug}.yaml`);
        console.log(filePath);
      }
    }
  }
}
