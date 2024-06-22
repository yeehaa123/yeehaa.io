import type { InitEntity } from "../entity/schema";
import { ContentType, type Meta } from "../meta/schema"
import * as path from 'path';
import * as m from "../meta";
import { writeFile } from 'fs/promises'
import { generateChecksum, hashify, parseMarkdown, slugify } from "../helpers";
import { stringify } from "yaml";
import type { Curator } from "@/offcourse/schema";

export const PATH_SUFFIX = "Profiles"

export type BaseProfile = {
  meta: Meta,
  profile: Curator,
  bio: string,
}

export type FinalProfile = BaseProfile

export type Profile = BaseProfile | FinalProfile

export function init({ item, author }: InitEntity) {
  const checksum = generateChecksum(item);
  const { content, data } = parseMarkdown(item);
  const profile = { ...data, alias: author }
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
    profile,
    bio: content
  } as BaseProfile;
}

export async function augment({ bio, meta, profile }: BaseProfile) {
  return { meta, bio, profile };
}

export function render({ bio, profile }: FinalProfile) {
  return `---
${stringify(profile).trim()}
---

${bio}
`
}

export async function write(basePath: string, { meta, bio, profile }: FinalProfile) {
  const slug = slugify(profile.alias);
  const markdownFilePath = path.join(basePath, PATH_SUFFIX, `${slug}.md`);
  const rendered = render({ meta, profile, bio });
  await writeFile(markdownFilePath, rendered, 'utf8');
}
