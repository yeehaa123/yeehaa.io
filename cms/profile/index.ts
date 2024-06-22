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
import * as ot from "../outputTable";
import { writeFile } from 'fs/promises'
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
  const analysis = {};
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
  return finalSchema.parse(entity);
}

export async function write(basePath: string, entity: FinalProfile) {
  const slug = slugify(entity.profile.alias);
  const markdownFilePath = path.join(basePath, PATH_SUFFIX, `${slug}.md`);
  const rendered = render(entity);
  await writeFile(markdownFilePath, rendered, 'utf8');
}

export function render({ bio, profile, associations }: FinalProfile) {
  return `---
${stringify({ ...profile, ...associations }).trim()}
---
${bio}
`
}
