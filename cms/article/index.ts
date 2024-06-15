import type { Meta } from "../meta"
import type { ArticleFrontmatter } from "./frontmatter";
import type { Tag, RenderableTreeNode } from '@markdoc/markdoc';
import * as path from 'path';
import voca from "voca";
import Markdoc from '@markdoc/markdoc';
import { stringify } from "yaml";
import { writeFile, copyFile } from 'fs/promises'
import * as ai from '../ai';
import * as fm from "./frontmatter";
import * as tr from "../meta";
import { generateChecksum } from "../helpers";

export const schema = fm.schema;

export type Article = {
  frontmatter: ArticleFrontmatter,
  content: string,
}

export type BaseArticle = {
  meta: Meta,
  content: string,
}

function isTag(node: RenderableTreeNode): node is Tag {
  return (node as Tag).name !== undefined;
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

export function parse(content: string) {
  const ast = Markdoc.parse(content);
  const contentTree = Markdoc.transform(ast);
  const title = collectTitle(contentTree);
  return { title };
}

export async function init({ content, series }:
  { series?: string | undefined, content: string }) {
  const checksum = generateChecksum(content);
  const { title } = parse(content);
  const meta = tr.init({
    title,
    contentType: tr.ContentType.ARTICLE,
    author: "Yeehaa",
    series,
    checksum
  })
  return {
    meta,
    content
  };
}

export async function augment(entry: BaseArticle) {
  const { content, meta } = entry;
  const { checksum, title } = meta;
  const { summary, tags, excerpt, imageURL } = await ai.augment({
    checksum, title, content
  })
  return {
    frontmatter: { ...meta, summary, tags, excerpt, imageURL },
    content
  }
}

export function render({ content, frontmatter }: Article) {
  return `---
${stringify(frontmatter).trim()}
---

${content}
`
}

export async function write(basePath: string, article: Article) {
  fm.validate(article.frontmatter);
  const { title, checksum } = article.frontmatter;
  const imgSrc = path.join('./.cache', `${checksum}.png`);
  const imgDest = path.join(basePath, "Posts", `${checksum}.png`);
  await copyFile(imgSrc, imgDest);
  const slug = `${voca.slugify(title)}`;
  const filePath = path.join(basePath, "Posts", `${slug}.md`);
  const file = render(article);
  await writeFile(filePath, file, 'utf8');
}
