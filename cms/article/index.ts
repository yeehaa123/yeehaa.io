import type {
  Article,
  InitArticle,
  BaseArticle,
  AnalyzedArticle,
  AssociatedArticle,
  FinalArticle,
} from "./schema"
import { ContentType } from "../meta/schema"
import { analyzedSchema, baseSchema, finalSchema } from "./schema"
import * as path from 'path';
import { stringify } from "yaml";
import { writeFile, copyFile } from 'fs/promises'
import * as ai from '../ai';
import * as fm from "./frontmatter";
import * as m from "../meta";
import { generateChecksum, hashify, slugify } from "../helpers";

export const PATH_SUFFIX = "Posts"
export const schema = fm.schema;

export async function init({ article, title, author, series }: InitArticle) {
  const meta = m.init({
    id: hashify(JSON.stringify({ title, author })),
    title,
    contentType: ContentType.ARTICLE,
    author,
    series,
    checksum: generateChecksum(article)
  })
  return baseSchema.parse({ meta, article });
}

export async function analyze(entry: BaseArticle) {
  const { article: content, meta } = entry;
  const { checksum, title } = meta;
  const { summary, tags, excerpt } = await ai.article.analyze({ title, content, checksum });
  const analysis = { summary, tags, excerpt };
  return analyzedSchema.parse({ ...entry, analysis })
}

export async function augment({ analysis, ...entity }: AssociatedArticle) {
  const { article, meta } = entity;
  const { checksum, title } = meta;
  const { summary, tags } = analysis;
  const imageURL = await ai.image.generate({ title, tags, summary, content: article, checksum });
  const augmentations = { imageURL };
  return finalSchema.parse({
    ...entity,
    analysis,
    augmentations,
  })
}

export function render({ article, analysis, associations, meta, augmentations }: FinalArticle) {
  const course = associations.course && slugify(associations.course);
  const { publicationData } = meta;
  const frontmatter = fm.init({
    ...meta,
    ...analysis,
    ...publicationData,
    ...augmentations,
    course,
  });
  return `---
${stringify(frontmatter).trim()}
---
${article}
`
}

export async function write(basePath: string, article: FinalArticle) {
  const { checksum, title } = article.meta;
  const imgSrc = path.join('./.cache', `${checksum}.png`);
  const imgDest = path.join(basePath, PATH_SUFFIX, `${checksum}.png`);
  await copyFile(imgSrc, imgDest);
  const slug = slugify(title);
  const filePath = path.join(basePath, PATH_SUFFIX, `${slug}.md`);
  const file = render(article);
  await writeFile(filePath, file, 'utf8');
}

export type { BaseArticle, AnalyzedArticle, AssociatedArticle, FinalArticle, Article }
