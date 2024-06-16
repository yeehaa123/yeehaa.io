import type { BaseArticle } from "./article";
import type { MetaTable } from "./table";
import type { CourseEntity } from "./course";
import { ContentType, Status } from "./meta";
import * as path from 'path';
import { readdir, lstat, readFile } from 'fs/promises'
import * as article from "./article";
import * as course from "./course";
import { deslugify, slugify } from "./helpers";

export const PATH_SUFFIXES = [article.PATH_SUFFIX, course.PATH_SUFFIX];

type Entity = CourseEntity | BaseArticle;

function isArticle(entity: Entity): entity is BaseArticle {
  return (entity as BaseArticle).meta.contentType === ContentType.ARTICLE;;
}

function isCourse(entity: Entity): entity is CourseEntity {
  return (entity as CourseEntity).meta.contentType === ContentType.COURSE;;
}

export type FileTree = Map<string, Entity>

async function processFile(filePath: string, author: string, series?: string) {
  try {
    const { ext } = path.parse(filePath);
    const item = await readFile(filePath, 'utf8');
    if (ext === ".md") {
      return article.init({ series, author, content: item })
    } else if (ext === '.offcourse') {
      return await course.init({ author, content: item })
    }
    return false;
  } catch (e) {
    throw (e);
  }
}

async function processDir(tree: FileTree, author: string, dirPath: string) {
  const seriesPath = path.parse(dirPath)
  const seriesSlug = seriesPath.name;
  const seriesName = deslugify(seriesSlug);
  const dir = await readdir(dirPath);
  for (const ext of dir) {
    const filePath = path.join(dirPath, ext);
    const processedFile = await processFile(filePath, author, seriesName);
    if (processedFile) {
      const { id } = processedFile.meta;
      tree.set(id, processedFile);
    }
  }
}

export async function create(basePath: string): Promise<FileTree> {
  const { name: author } = path.parse(basePath)
  const dir = await readdir(basePath);
  const tree = new Map;
  for (const ext of dir) {
    const newPath = path.join(basePath, ext);
    const stats = await lstat(newPath)
    if (stats.isDirectory()) {
      console.log("ENTERING DIR: ", ext);
      await processDir(tree, author, newPath);
    } else {
      const processedFile = await processFile(newPath, author);
      if (processedFile) {
        const { id } = processedFile.meta;
        tree.set(id, processedFile);
      }
    }
  }
  return tree;
}

export function associate(tree: FileTree, metaTable: MetaTable) {
  for (const articleMeta of metaTable) {
    const { title, contentType } = articleMeta;
    if (contentType === ContentType.ARTICLE) {
      const courseMeta = metaTable.find((m) => m.title === title && m.contentType === ContentType.COURSE);
      if (courseMeta) {
        const article = tree.get(articleMeta.id);
        const course = tree.get(courseMeta.id);
        const slug = slugify(title);
        if (article && course) {
          tree.set(articleMeta.id, {
            ...article,
            meta: {
              ...articleMeta,
              course: slug
            }
          });
          tree.set(courseMeta.id, {
            ...course,
            meta: {
              ...courseMeta,
              habitat: slug
            }
          });
        }
      }
    }
  }
}

export function update(tree: FileTree, metaTable: MetaTable) {
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
    const { status, checksum } = entry.meta;
    if (status !== Status.DRAFT) {
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
