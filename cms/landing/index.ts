import type {
  AnalyzedLanding,
  BaseLanding,
  AssociatedLanding,
  FinalLanding,
  InitLanding,
  Landing
} from "./schema"
import type { AnalyzedTable } from "../outputTable";
import { ContentType } from "../meta/schema"
import { analyzedSchema, associatedSchema, baseSchema, finalSchema, outputSchema } from "./schema"
import * as path from 'path';
import * as m from "../meta";
import * as ai from "./ai";
import { writeFile, copyFile } from 'fs/promises'
import { generateChecksum, hashify } from "../helpers";
import * as yaml from "yaml";

export const PATH_SUFFIX = "LandingPage"
export const schema = outputSchema

export function init({ page_content }: InitLanding) {
  const { title } = page_content;
  const checksum = generateChecksum(JSON.stringify(page_content));
  const hash = hashify(title);
  const meta = m.init({
    id: hash,
    title,
    contentType: ContentType.LANDING_PAGE,
    checksum
  })
  return baseSchema.parse({ meta, page_content })
}

export async function analyze(entity: BaseLanding) {
  const { description, tags, excerpt } = await ai.analyze(entity);
  const analysis = { description, tags, excerpt };
  return analyzedSchema.parse({ ...entity, analysis });
}

export function associate(entity: AnalyzedLanding, _table: AnalyzedTable) {
  const associations = {};
  return associatedSchema.parse({ ...entity, associations })
}

export async function augment(entity: AssociatedLanding) {
  const { meta, analysis } = entity;
  const { checksum } = meta;
  const bannerImageURL = await ai.bannerImage(analysis, checksum);
  const augmentations = { bannerImageURL };
  return finalSchema.parse({ ...entity, augmentations })
}

export async function write(basePath: string, entity: FinalLanding) {
  const { augmentations } = entity
  const { bannerImageURL } = augmentations;
  const imgSrc = path.join('./.cache', bannerImageURL);
  const imgDest = path.join(basePath, PATH_SUFFIX, bannerImageURL);
  await copyFile(imgSrc, imgDest);
  const dataFilePath = path.join(basePath, PATH_SUFFIX, `index.yaml`);
  const dataFile = render(entity);
  await writeFile(dataFilePath, dataFile, 'utf8');
}

function render(entity: FinalLanding) {
  const { page_content, analysis, augmentations } = entity;
  const { bannerImageURL } = augmentations;
  const output = outputSchema.parse({
    ...page_content,
    ...augmentations,
    bannerImageURL: `./${bannerImageURL}`,
    ...analysis,
  });
  return yaml.stringify(output);
}


export type { BaseLanding, AnalyzedLanding, AssociatedLanding, FinalLanding, Landing }
