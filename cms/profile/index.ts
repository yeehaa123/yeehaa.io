import type { Meta } from "../meta/schema";
import type { InitEntity } from "cms/entity/schema";
import type { ProfileData } from "./schema"
import { ContentType } from "../meta/schema"
import * as path from 'path';
import * as m from "../meta";
import { writeFile } from 'fs/promises'
import { generateChecksum, hashify, parseMarkdown, slugify } from "../helpers";
import { stringify } from "yaml";

export const PATH_SUFFIX = "Profiles"

export type BaseProfile = {
  meta: Meta,
  profile: Omit<ProfileData, 'alias'>,
  content: string,
}

export type FinalProfile = {
  meta: Meta,
  profile: ProfileData,
  content: string
}

export type Profile = BaseProfile | FinalProfile;

export function init({ item, author }: InitEntity) {
  const checksum = generateChecksum(item);
  const { content, data } = parseMarkdown(item);
  let hash = hashify(JSON.stringify({ author }));
  const meta = m.init({
    id: hash,
    title: author,
    contentType: ContentType.PROFILE,
    author,
    checksum
  })
  return {
    meta,
    profile: data,
    content
  };
}

export async function augment({ content, meta, profile }: BaseProfile) {
  const p = { alias: meta.author, ...profile };
  const m = { ...meta, contentType: ContentType.PROFILE };
  return { meta: m, profile: p, content };
}

export function render({ content, profile }: FinalProfile) {
  return `---
${stringify(profile).trim()}
---

${content}
`
}

export async function write(basePath: string, { meta, content, profile }: FinalProfile) {
  const slug = slugify(profile.alias);
  const markdownFilePath = path.join(basePath, PATH_SUFFIX, `${slug}.md`);
  const rendered = render({ meta, profile, content });
  await writeFile(markdownFilePath, rendered, 'utf8');
}
