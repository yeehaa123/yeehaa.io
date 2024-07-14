import type { AnalyzedSeries, BaseSeries, AssociatedSeries, FinalSeries, Series } from "./schema";
import type { AnalyzedTable } from "cms/outputTable";
import { ContentType, Status } from "../meta/schema"
import { analyzedSchema, associatedSchema, finalSchema, outputSchema } from "./schema";
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
    status: Status.PUBLISHED,
    contentType: ContentType.SERIES,
    checksum: generateChecksum(id)
  })
  const analysis = { tags: [] }
  return analyzedSchema.parse({ meta, series: true, analysis })
}

export function associate(entity: AnalyzedSeries, table: AnalyzedTable) {
  const articles = ot.findArticlesForSeries(table, entity.meta.title);
  const courses = ot.findCoursesForSeries(table, entity.meta.title);
  const associations = {
    articles: articles.map(as.init),
    courses: courses.map(as.init),
  }
  return associatedSchema.parse({ ...entity, associations })
}

export async function augment(entity: AssociatedSeries) {
  const { associations } = entity;
  const checksum = generateChecksum(JSON.stringify(associations));
  const { summary, tags, excerpt } = await ai.analyze(entity, checksum);
  const bannerImageURL = await ai.bannerImage({ summary, tags }, checksum);
  const augmentations = { summary, tags, excerpt, bannerImageURL, checksum }
  return finalSchema.parse({ ...entity, augmentations })
}

export async function write(basePath: string, entity: FinalSeries) {
  const { meta, augmentations } = entity;
  const { title } = meta;
  const { bannerImageURL } = augmentations;
  const bannerImgSrc = path.join('./.cache', bannerImageURL);
  const bannerImgDst = path.join(basePath, PATH_SUFFIX, bannerImageURL);
  await copyFile(bannerImgSrc, bannerImgDst);
  const slug = slugify(title);
  const dataFilePath = path.join(basePath, PATH_SUFFIX, `${slug}.yaml`);
  const dataFile = render(entity);
  await writeFile(dataFilePath, dataFile, 'utf8');
}

function render(entity: FinalSeries) {
  const { meta, augmentations, associations } = entity;
  const { title } = meta;
  const { bannerImageURL } = augmentations;
  const articles = associations.articles.sort(
    (a, b) => {
      if (b.publishedAt && a.publishedAt) {
        return a.publishedAt > b.publishedAt ? 0 : -1
      } else {
        return -1
      }
    }).map(({ title }) => slugify(title));
  const output = outputSchema.parse({
    ...augmentations,
    title,
    articles,
    bannerImageURL: `./${bannerImageURL}`
  })
  return yaml.stringify(output)
}

export type { BaseSeries, AnalyzedSeries, AssociatedSeries, FinalSeries, Series }
