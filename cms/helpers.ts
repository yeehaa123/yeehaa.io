import { existsSync } from "fs"
import type { Tag, RenderableTreeNode } from '@markdoc/markdoc';
import Markdoc from '@markdoc/markdoc';
import { createHash } from 'crypto';
import crypto from "crypto"
import pLimit from "p-limit";
import voca from "voca";
import * as yaml from "yaml";
import { mkdir, rm } from 'fs/promises'
import path from "path";
import matter from 'gray-matter';

export const limit = pLimit(3);

function isTag(node: RenderableTreeNode): node is Tag {
  return (node as Tag).name !== undefined;
}
export async function initDir(dirName: string) {
  try {
    const outputExists = existsSync(dirName)
    if (outputExists) {
      await rm(dirName, { recursive: true })
      console.log(`CLEANED ${dirName} OUTPUT`);
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

function collectTitle(node: RenderableTreeNode, sections = []): string | undefined {
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
  return undefined;
}

export function parseProfileFile(file: string) {
  const { data, content } = matter(file)
  return { ...data, bio: content }
}

export function parseMarkdoc(content: string) {
  const ast = Markdoc.parse(content);
  const contentTree = Markdoc.transform(ast);
  const title = collectTitle(contentTree);
  const frontmatter = ast.attributes.frontmatter ? yaml.parse(ast.attributes.frontmatter) : {};
  return { title, frontmatter, content };
}
