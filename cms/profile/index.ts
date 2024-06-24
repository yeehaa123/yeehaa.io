import type {
  AnalyzedProfile,
  BaseProfile,
  AssociatedProfile,
  FinalProfile,
  InitProfile,
  Profile
} from "./schema"
import type { AnalyzedTable } from "../outputTable";
import { ContentType } from "../meta/schema"
import { analyzedSchema, associatedSchema, baseSchema, finalSchema } from "./schema"
import * as path from 'path';
import * as m from "../meta";
import * as as from "../association";
import * as ai from "./ai";
import * as ot from "../outputTable";
import { writeFile, copyFile } from 'fs/promises'
import { generateChecksum, hashify, slugify } from "../helpers";
import { stringify } from "yaml";

export const PATH_SUFFIX = "Profiles"

export function init({ profile: initial, author }: InitProfile) {
  const checksum = generateChecksum(JSON.stringify(initial));
  const profile = { ...initial, alias: author }
  let hash = hashify(JSON.stringify({ author }));
  const meta = m.init({
    id: hash,
    title: author,
    contentType: ContentType.PROFILE,
    author,
    checksum
  })
  return baseSchema.parse({ meta, profile })
}

export async function analyze(entity: BaseProfile) {
  const analysis = await ai.analyze(entity);
  return analyzedSchema.parse({ ...entity, analysis });
}

export function associate(entity: AnalyzedProfile, table: AnalyzedTable) {
  const { author } = entity.meta;
  const articles = ot.findArticlesForAuthor(table, author).map(as.init)
  const courses = ot.findCoursesForAuthor(table, author).map(as.init)
  const associations = { articles, courses }
  return associatedSchema.parse({ ...entity, associations })
}

export async function augment(entity: AssociatedProfile) {
  const checksum = generateChecksum(JSON.stringify(entity));
  const aiAug = await ai.augment(entity, checksum);
  const profileImageURL = await ai.profilePicture(aiAug, checksum)
  const bannerImageURL = await ai.bannerImage(aiAug, checksum);
  const augmentations = { ...aiAug, bannerImageURL, profileImageURL, checksum }
  return finalSchema.parse({ ...entity, augmentations });
}

export async function write(basePath: string, entity: FinalProfile) {
  const { profile, analysis, augmentations, associations } = entity;
  const { checksum } = entity.augmentations;
  const profileImgSrc = path.join('./.cache', `${checksum}-profile.png`);
  const profileImgDst = path.join(basePath, PATH_SUFFIX, `${checksum}.png`);
  await copyFile(profileImgSrc, profileImgDst);
  const bannerImgSrc = path.join('./.cache', `${checksum}-banner.png`);
  const bannerImgDst = path.join(basePath, PATH_SUFFIX, `${checksum}.png`);
  await copyFile(bannerImgSrc, bannerImgDst);
  const slug = slugify(entity.profile.alias);
  const dataFilePath = path.join(basePath, PATH_SUFFIX, `${slug}.yaml`);
  const articles = associations.articles.map(({ title }) => title);
  const courses = associations.courses.map(({ title }) => title);
  const dataFile = stringify({ ...profile, ...analysis, ...augmentations, articles, courses });
  await writeFile(dataFilePath, dataFile, 'utf8');
}
export type { BaseProfile, AnalyzedProfile, AssociatedProfile, FinalProfile, Profile }
