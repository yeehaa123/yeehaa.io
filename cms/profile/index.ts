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
import { analyzedSchema, associatedSchema, baseSchema, finalSchema, outputSchema } from "./schema"
import * as path from 'path';
import * as m from "../meta";
import * as as from "../association";
import * as ai from "./ai";
import * as ot from "../outputTable/filters";
import { writeFile, copyFile } from 'fs/promises'
import { generateChecksum, hashify, slugify, deslugify } from "../helpers";
import * as yaml from "yaml";

export const PATH_SUFFIX = "Profiles"
export const schema = outputSchema

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
  const { profile } = entity;
  return analyzedSchema.parse({ ...entity, analysis: { ...analysis, profile } });
}

export function associate(entity: AnalyzedProfile, table: AnalyzedTable) {
  const { title } = entity.meta;
  const articles = ot.findArticlesForAuthor(table, title).map(as.init)
  const courses = ot.findCoursesForAuthor(table, title).map(as.init)
  const associations = { articles, courses }
  return associatedSchema.parse({ ...entity, associations })
}

export async function augment(entity: AssociatedProfile) {
  const { meta, associations } = entity;
  const { title } = meta;
  const checksum = generateChecksum(JSON.stringify({ title, associations }));
  const aiAug = await ai.augment(entity, checksum);
  const profileImageURL = await ai.profilePicture(aiAug, checksum)
  const bannerImageURL = await ai.bannerImage(aiAug, checksum);
  const augmentations = { ...aiAug, bannerImageURL, profileImageURL, checksum }
  return finalSchema.parse({ ...entity, augmentations });
}

export async function write(basePath: string, entity: FinalProfile) {
  const { profileImageURL } = entity.augmentations;
  const profileImgSrc = path.join('./.cache', profileImageURL);
  const profileImgDst = path.join(basePath, PATH_SUFFIX, profileImageURL);
  await copyFile(profileImgSrc, profileImgDst);
  const slug = slugify(entity.profile.alias);
  const dataFilePath = path.join(basePath, PATH_SUFFIX, `${slug}.yaml`);
  const dataFile = render(entity);
  await writeFile(dataFilePath, dataFile, 'utf8');
}

function render(entity: FinalProfile) {
  const { meta, profile, analysis, augmentations, associations } = entity;
  const title = deslugify(meta.title);
  const { profileImageURL } = entity.augmentations;
  const articles = associations.articles.map(({ title }) => slugify(title));
  const courses = associations.courses.map(({ title }) => slugify(title));
  const output = outputSchema.parse({
    title,
    ...profile,
    ...analysis,
    ...augmentations,
    profileImageURL: `./${profileImageURL}`,
    articles,
    courses
  });
  return yaml.stringify(output);
}


export type { BaseProfile, AnalyzedProfile, AssociatedProfile, FinalProfile, Profile }
