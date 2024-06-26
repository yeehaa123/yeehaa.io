import type { AnalyzedSeries, BaseSeries, AssociatedSeries, FinalSeries, Series } from "./schema";
import type { AnalyzedTable } from "cms/outputTable";
import { ContentType } from "../meta/schema"
import { analyzedSchema, associatedSchema, baseSchema, finalSchema, outputSchema } from "./schema";
import * as path from 'path';
import * as ai from "./ai";
import { writeFile, copyFile } from 'fs/promises'
import * as ot from "../outputTable/filters";
import * as m from "../meta";
import { generateChecksum, hashify, slugify } from "../helpers";
import * as yaml from "yaml";
import * as as from "../association"

export const PATH_SUFFIX = "Series"
export const schema = outputSchema;

export function init({ series, author }: { series: string, author: string }) {
  const id = hashify(JSON.stringify({ series }));
  const meta = m.init({
    id,
    title: series,
    author,
    contentType: ContentType.SERIES,
    checksum: generateChecksum(id)
  })
  return baseSchema.parse({ meta, series: true })
}

export function analyze(entry: BaseSeries) {
  const analysis = {}
  return analyzedSchema.parse({ ...entry, analysis })
}

export function associate(entity: AnalyzedSeries, table: AnalyzedTable) {
  const series = ot.findSeriesForArticle(table, entity.meta.title);
  const associations = { articles: series.map(as.init) };
  return associatedSchema.parse({ ...entity, associations })
}

export async function augment(entity: AssociatedSeries) {
  const checksum = generateChecksum(JSON.stringify(entity));
  const { summary, tags, excerpt } = await ai.analyze(entity, checksum);
  const bannerImageURL = await ai.bannerImage({ summary, tags }, checksum);
  const augmentations = { summary, tags, excerpt, bannerImageURL, checksum }
  return finalSchema.parse({ ...entity, augmentations })
}

export async function write(basePath: string, entity: FinalSeries) {
  const { meta, augmentations, associations } = entity;
  const { title } = meta;
  const { bannerImageURL } = augmentations;
  console.log(bannerImageURL);
  const bannerImgSrc = path.join('./.cache', bannerImageURL);
  const bannerImgDst = path.join(basePath, PATH_SUFFIX, bannerImageURL);
  await copyFile(bannerImgSrc, bannerImgDst);
  const slug = slugify(title);
  const dataFilePath = path.join(basePath, PATH_SUFFIX, `${slug}.yaml`);
  const articles = associations.articles.map(({ title }) => slugify(title));
  console.log(articles);
  const output = outputSchema.parse({ title, ...augmentations, articles, bannerImageURL: `./${bannerImageURL}` })
  const dataFile = yaml.stringify(output)
  await writeFile(dataFilePath, dataFile, 'utf8');
}

export type { BaseSeries, AnalyzedSeries, AssociatedSeries, FinalSeries, Series }
