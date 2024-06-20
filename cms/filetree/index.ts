import type { MetaTable } from "../table";
import type { Entity } from "./entity"
import * as entity from "./entity"
import { ContentType } from "../meta";
import * as path from 'path';
import { readdir, lstat, readFile } from 'fs/promises'
import * as article from "../article";
import * as course from "../course";
import * as profile from "../profile";
import { deslugify } from "../helpers";


export type FileTree = Map<string, Entity>

async function processFile(filePath: string, author: string, series?: string) {
  try {
    const { ext, name, } = path.parse(filePath);
    const item = await readFile(filePath, 'utf8');
    if (name === "profile") {
      return profile.init({ item, author })
    }
    if (ext === ".md") {
      return article.init({ series, author, item })
    } else if (ext === '.offcourse') {
      return await course.init({ author, item })
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
  for (const meta of metaTable) {
    const { contentType } = meta;
    if (contentType === ContentType.PROFILE) {
      const profileMeta = meta;
      const x = metaTable
        .filter(m => m.author === profileMeta.author)
        .filter(m => m.contentType !== ContentType.PROFILE)
        .reduce((acc, item) => {
          const items = acc.get(item.contentType);
          acc.set(item.contentType, items ? [...items, item] : [item]);
          return acc;
        }, new Map);
      console.log(x);
    }
    if (contentType === ContentType.ARTICLE) {
      const articleMeta = meta;
      const courseMeta = metaTable
        .filter(m => m.contentType === ContentType.COURSE)
        .find((m) => m.title === articleMeta.title || m.habitat === articleMeta.title);
      if (courseMeta) {
        const article = tree.get(articleMeta.id);
        const course = tree.get(courseMeta.id);
        if (article && course) {
          tree.set(articleMeta.id, {
            ...article,
            meta: {
              ...article.meta,
              course: course.meta.title
            }
          });
          tree.set(courseMeta.id, {
            ...course,
            meta: {
              ...course.meta,
              habitat: article.meta.title
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
    entity.write(basePath, entry);
  }
}
