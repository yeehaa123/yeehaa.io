import type { BaseArticle } from "./article";
import type { CourseEntity } from "./course";
import type { Meta } from "./meta";
import { ContentType } from "./meta";
import * as path from 'path';
import { readdir, lstat, readFile } from 'fs/promises'
import * as article from "./article";
import * as course from "./course";
import { deslugify } from "./helpers";

export const PATH_SUFFIXES = [article.PATH_SUFFIX, course.PATH_SUFFIX];

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

async function processDir(tree: FileTree, dirPath: string) {
  const seriesPath = path.parse(dirPath)
  const seriesSlug = seriesPath.name;
  const seriesName = deslugify(seriesSlug);
  const dir = await readdir(dirPath);
  for (const ext of dir) {
    const filePath = path.join(dirPath, ext);
    const processedFile = await processFile(filePath, seriesName);
    if (processedFile) {
      const { id } = processedFile.meta;
      tree.set(id, processedFile);
    }
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
      if (processedFile) {
        const { id } = processedFile.meta;
        tree.set(id, processedFile);
      }
    }
  }
  return tree;
}

export function update(tree: FileTree, metaTable: Meta[]) {
  for (const meta of metaTable) {
    const { id } = meta;
    const entry = tree.get(id);
    if (entry) {
      tree.set(id, { ...entry, meta });
    }
  }
}

export async function write(basePath: string, tree: FileTree) {
  for (const [_, entry] of tree) {
    const { draft, checksum } = entry.meta;
    if (!draft) {
      if (isArticle(entry)) {
        const augmented = await article.augment(entry);
        await article.write(basePath, checksum, augmented);
      } else if (isCourse(entry)) {
        const augmented = await course.augment(entry);
        await course.write(basePath, augmented);
      }
    }
  }
}
