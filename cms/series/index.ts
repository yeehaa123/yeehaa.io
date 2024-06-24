import type { Meta } from "../meta/schema"
import type { AnalyzedSeries, BaseSeries, AssociatedSeries, FinalSeries, Series } from "./schema";
import type { AnalyzedTable } from "cms/outputTable";
import { ContentType, Status } from "../meta/schema"
import { analyzedSchema, baseSchema, associatedSchema, finalSchema } from "./schema";
import * as path from 'path';
import * as ai from "./ai";
import { writeFile, copyFile } from 'fs/promises'
import * as ot from "../outputTable";
import * as m from "../meta";
import { generateChecksum, hashify, slugify } from "../helpers";
import * as yaml from "yaml";
import * as as from "../association"


export const PATH_SUFFIX = "Series"

type SeriesMap = Map<string, Meta[]>

export function init({ series, author }: { series: string, author: string }) {
  const id = hashify(JSON.stringify({ series, author }));
  const meta = m.init({
    id,
    title: series,
    contentType: ContentType.SERIES,
    author,
    checksum: generateChecksum(id)
  })
  return baseSchema.parse({ meta, series: true })
}


export function analyze(entry: BaseSeries) {
  const analysis = {};
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
  const { checksum } = augmentations;
  const bannerImgSrc = path.join('./.cache', `${checksum}-banner.png`);
  const bannerImgDst = path.join(basePath, PATH_SUFFIX, `${checksum}.png`);
  await copyFile(bannerImgSrc, bannerImgDst);
  const slug = slugify(title);
  const dataFilePath = path.join(basePath, PATH_SUFFIX, `${slug}.yaml`);
  const articles = associations.articles.map(({ title }) => title);
  const dataFile = yaml.stringify({ title, ...augmentations, articles })
  await writeFile(dataFilePath, dataFile, 'utf8');
}

export function group(tableData: Meta[]) {
  return tableData.reduce(
    (acc: SeriesMap, tableRow: Meta) => {
      const { series, status } = tableRow;
      if (status !== Status.DRAFT && series) {
        const oldEntries = acc.get(series);
        const entries = oldEntries ? [...oldEntries, tableRow] : [tableRow];
        acc.set(series, entries);
      }
      return acc
    }, new Map)
}

export function order(seriesMap: SeriesMap) {
  return Array.from(seriesMap).flatMap(([_, series]) => {
    return series.sort((a, b) => {
      if (a.publicationData?.publishedAt && b.publicationData?.publishedAt) {
        return a.publicationData.publishedAt.getTime() - b.publicationData.publishedAt.getTime();
      } else {
        return -1
      }
    }).map((tableRow, order) => {
      return { ...tableRow, order }
    })
  })
}


export type { BaseSeries, AnalyzedSeries, AssociatedSeries, FinalSeries, Series }
