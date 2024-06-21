import type { Meta } from "../meta/schema"
import type { ArticleFrontmatter } from "./frontmatter";
import { ContentType } from "../meta/schema"
import * as path from 'path';
import { stringify } from "yaml";
import { writeFile, copyFile } from 'fs/promises'
import * as ai from '../ai';
import * as fm from "./frontmatter";
import * as m from "../meta";
import { generateChecksum, hashify, parseMarkdoc, slugify } from "../helpers";
import type { Analysis } from "@/offcourse/schema";

export const PATH_SUFFIX = "Posts"
export const schema = fm.schema;

export type BaseArticle = {
  meta: Meta,
  content: string,
}

export type AnalyzedArticle = {
  meta: Meta,
  analysis: Analysis,
  content: string,
}

export type FinalArticle = {
  meta: Meta,
  frontmatter: ArticleFrontmatter,
  content: string,
}

export type Article = BaseArticle | FinalArticle;

export async function init({ item, author, series }:
  { series?: string | undefined, author: string, item: string }) {
  const checksum = generateChecksum(item);
  const { title, content } = parseMarkdoc(item);
  if (!title) { throw ("ARTICLE NEEDS TITLE"); }
  let hash = hashify(JSON.stringify({ title, author }));
  const meta = m.init({
    id: hash,
    title,
    contentType: ContentType.ARTICLE,
    author,
    series,
    checksum
  })
  return {
    meta,
    content
  };
}

export function analysis(entity: BaseArticle) {
  const analysis = { summary: "BLA", tags: [], excerpt: "HHHH" }
  return { ...entity, analysis }
}

export async function augment(entry: BaseArticle) {
  const { content, meta } = entry;
  const { checksum, title, publicationData } = meta;
  const { summary, tags, excerpt } = await ai.article.analyze({ title, content, checksum });
  const imageURL = await ai.image.generate({ title, tags, summary, content, checksum });
  const course = meta.course && slugify(meta.course);
  const frontmatter = fm.init({
    ...meta,
    course,
    ...publicationData,
    summary,
    tags,
    excerpt,
    imageURL
  });
  return {
    meta,
    frontmatter,
    content
  }
}

export function render({ content, frontmatter }: FinalArticle) {
  return `---
${stringify(frontmatter).trim()}
---

${content}
`
}

export async function write(basePath: string, article: FinalArticle) {
  const { checksum } = article.meta;
  const { title } = article.frontmatter;
  const imgSrc = path.join('./.cache', `${checksum}.png`);
  const imgDest = path.join(basePath, PATH_SUFFIX, `${checksum}.png`);
  await copyFile(imgSrc, imgDest);
  const slug = slugify(title);
  const filePath = path.join(basePath, PATH_SUFFIX, `${slug}.md`);
  const file = render(article);
  await writeFile(filePath, file, 'utf8');
}
