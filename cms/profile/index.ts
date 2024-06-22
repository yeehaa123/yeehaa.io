import type { BaseProfile, FinalProfile, InitProfile, Profile } from "./schema"
import { ContentType } from "../meta/schema"
import { baseSchema, finalSchema } from "./schema"
import * as path from 'path';
import * as m from "../meta";
import { writeFile } from 'fs/promises'
import { generateChecksum, hashify, slugify } from "../helpers";
import { stringify } from "yaml";

export const PATH_SUFFIX = "Profiles"
export type { BaseProfile, FinalProfile, Profile }

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

export async function augment({ bio, meta, profile }: BaseProfile) {
  return finalSchema.parse({ meta, bio, profile });
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
