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
export type { BaseProfile, AnalyzedProfile, AssociatedProfile, FinalProfile, Profile }

export function init({ content, data, author }: InitProfile) {
  const checksum = generateChecksum(content);
  const profile = { socials: data.socials, alias: author }
  let hash = hashify(JSON.stringify({ author }));
  const meta = m.init({
    id: hash,
    title: author,
    contentType: ContentType.PROFILE,
    author,
    checksum
  })
  return baseSchema.parse({
    meta,
    profile,
    bio: content
  })
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
  const { description, blurb, tags, checksum } = await ai.augment(entity);
  console.log(checksum);
  const profileImageURL = await ai.profilePicture({ description, tags, alias: entity.profile.alias, checksum })
  const bannerImageURL = await ai.bannerImage({ description, tags, alias: entity.profile.alias, checksum })
  const augmentations = { description, blurb, tags, bannerImageURL, profileImageURL, checksum }
  return finalSchema.parse({ ...entity, augmentations });
}

export async function write(basePath: string, entity: FinalProfile) {
  const { checksum } = entity.augmentations;
  const profileImgSrc = path.join('./.cache', `${checksum}-profile.png`);
  const profileImgDst = path.join(basePath, PATH_SUFFIX, `${checksum}.png`);
  await copyFile(profileImgSrc, profileImgDst);
  const bannerImgSrc = path.join('./.cache', `${checksum}-banner.png`);
  const bannerImgDst = path.join(basePath, PATH_SUFFIX, `${checksum}.png`);
  await copyFile(bannerImgSrc, bannerImgDst);
  const slug = slugify(entity.profile.alias);
  const markdownFilePath = path.join(basePath, PATH_SUFFIX, `${slug}.md`);
  const rendered = render(entity);
  await writeFile(markdownFilePath, rendered, 'utf8');
}

export function render({ bio, profile, analysis, augmentations, associations }: FinalProfile) {
  const courses = associations.courses.map(({ title, description }) => ({ title, description }));
  const articles = associations.articles.map(({ title, excerpt }) => ({ title, excerpt }));
  return `---
${stringify({ ...profile, ...analysis, ...augmentations, articles, courses }).trim()}
---
${bio}
`
}
