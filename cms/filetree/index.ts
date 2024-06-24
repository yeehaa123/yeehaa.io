import type { MetaTable } from "../metaTable";
import type { Curator } from "@/offcourse/schema";
import type { File, FileTree } from "./schema"
import * as et from "../entity"
import * as path from 'path';
import * as ef from "../entity/filters";
import * as m from "../meta";
import { readdir, lstat, readFile } from 'fs/promises'
import { deslugify, parseMarkdoc } from "../helpers";
import * as yaml from "yaml";
import type { RawCourse } from "cms/course";
import { ContentType } from "cms/meta/schema";
import { isMarkdownFile, isOffcourseFile, isProfileFile } from "./filters";


async function convertFile(fileData: File) {
  const { item } = fileData;
  if (isProfileFile(fileData)) {
    const content = yaml.parse(item) as Curator
    return { content, contentType: ContentType.PROFILE }
  }

  if (isMarkdownFile(fileData)) {
    const { title, content } = parseMarkdoc(item);
    if (!title) { throw ("ARTICLE NEEDS TITLE"); }
    return { title, content, contentType: ContentType.ARTICLE }
  }

  if (isOffcourseFile(fileData)) {
    const content = await yaml.parse(item) as RawCourse;
    return { content, contentType: ContentType.COURSE }
  }
  throw ("INVALID FILE TYPE")
}

async function processFile(tree: FileTree, filePath: string, author: string, seriesName?: string) {
  const { ext: fileType, name: fileName } = path.parse(filePath);
  const item = await readFile(filePath, 'utf8');
  const { content, title, contentType } = await convertFile({ fileName, fileType, item });
  const entity = await et.init({
    content,
    title,
    contentType,
    seriesName,
    author
  })
  tree.set(entity.meta.id, entity);
}

async function processDir(tree: FileTree, author: string, dirPath: string) {
  const seriesPath = path.parse(dirPath)
  const seriesSlug = seriesPath.name;
  const seriesName = deslugify(seriesSlug);
  const entity = await et.init({
    contentType: ContentType.SERIES,
    content: "TBD",
    seriesName,
    author
  });
  tree.set(entity.meta.id, entity);
  const dir = await readdir(dirPath);
  for (const ext of dir) {
    const filePath = path.join(dirPath, ext);
    await processFile(tree, filePath, author, seriesName);
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
      await processDir(tree, author, newPath);
    } else {
      await processFile(tree, newPath, author);
    }
  }
  return tree;
}

export function toMetaTable(tree: FileTree) {
  return Array.from(tree).map(([_, { meta }]) => {
    return m.init({ ...meta });
  })
}

export function toOutputTable(tree: FileTree) {
  return Array.from(tree).map(([_, entity]) => entity).filter((ef.isNotDraft))
}

export function update(tree: FileTree, metaTable: MetaTable) {
  for (const meta of metaTable) {
    const { id } = meta;
    const entity = tree.get(id);
    if (entity) {
      const updated = { ...entity, meta }
      tree.set(entity.meta.id, updated);
    }
  }
}
