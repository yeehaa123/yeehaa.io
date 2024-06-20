import type { MetaTable } from "../table";
import type { Entity } from "../entity"
import * as et from "../entity"
import * as path from 'path';
import { readdir, lstat, readFile } from 'fs/promises'
import { deslugify } from "../helpers";

export type FileTree = Map<string, Entity>

function set(tree: FileTree, entity: Entity) {
  tree.set(entity.meta.id, entity)
}

async function processFile(tree: FileTree, filePath: string, author: string, series?: string) {
  const { ext: fileType, name: fileName } = path.parse(filePath);
  const item = await readFile(filePath, 'utf8');
  const entity = await et.init({ item, fileType, fileName, series, author })
  set(tree, entity);
}

async function processDir(tree: FileTree, author: string, dirPath: string) {
  const seriesPath = path.parse(dirPath)
  const seriesSlug = seriesPath.name;
  const seriesName = deslugify(seriesSlug);
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

export function associate(tree: FileTree, metaTable: MetaTable) {
  for (const { id } of metaTable) {
    const entity = tree.get(id);
    for (const { id } of metaTable) {
      const other = tree.get(id);
      if (entity && other) {
        const associatedEntity = et.associate(entity, other);
        if (associatedEntity) {
          set(tree, associatedEntity);
        }
      }
    }
  }
}

export function update(tree: FileTree, metaTable: MetaTable) {
  for (const meta of metaTable) {
    const { id } = meta;
    const entity = tree.get(id);
    if (entity) {
      const updated = { ...entity, meta }
      set(tree, updated);
    }
  }
}

export async function write(basePath: string, tree: FileTree) {
  for (const [_, entry] of tree) {
    et.write(basePath, entry);
  }
}
