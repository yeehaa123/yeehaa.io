import { existsSync } from "fs"
import type { Tag, RenderableTreeNode } from '@markdoc/markdoc';
import Markdoc from '@markdoc/markdoc';
import { createHash } from 'crypto';
import crypto from "crypto"
import voca from "voca";
import { mkdir, rm } from 'fs/promises'
import path from "path";

function isTag(node: RenderableTreeNode): node is Tag {
  return (node as Tag).name !== undefined;
}
export async function initDir(dirName: string) {
  try {
    const outputExists = existsSync(dirName)
    if (outputExists) {
      console.log("CLEANING OUTPUT", dirName);
      await rm(dirName, { recursive: true })
      console.log("CLEANED OUTPUT");
    }
    await mkdir(dirName, { recursive: true })
  }
  catch (e) {
    console.log(e);
  }
}

export async function initDirs(baseDir: string, extensions: string[]) {
  for (const extension of extensions) {
    const dirName = path.join(baseDir, extension);
    await initDir(dirName);
  }
}

export function hashify(str: string) {
  return createHash('md5').update(str).digest("hex")
}

export function deslugify(slug: string) {
  return voca
    .chain(slug)
    .replaceAll("-", " ")
    .titleCase()
    .value();
}

export function generateChecksum(str: string) {
  return crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex');
}

export function slugify(str: string) {
  return voca.slugify(str)
}

function collectTitle(node: RenderableTreeNode, sections = []): string {
  if (node && isTag(node)) {
    if (node.name.match(/h1/)) {
      return node.children[0] as string;
    }
    if (node.children) {
      for (const child of node.children) {
        return collectTitle(child, sections);
      }
    }
  }
  throw ("ARTICLE NEEDS TITLE");
}

export function parseMarkdown(content: string) {
  const ast = Markdoc.parse(content);
  const contentTree = Markdoc.transform(ast);
  const title = collectTitle(contentTree);
  return { title };
}
