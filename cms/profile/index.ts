import type { Meta } from "../meta/schema";
import type { InitEntity } from "cms/entity/schema";
import type { Curator } from "@/offcourse/schema";

import { ContentType } from "../meta/schema"

import * as path from 'path';
import * as m from "../meta";
import { generateChecksum, hashify, parseMarkdown, slugify } from "../helpers";
import { writeFile } from 'fs/promises'
import { stringify } from "yaml";

export const PATH_SUFFIX = "Profiles"

export type BaseProfile = {
  meta: Meta,
  data: Omit<Curator, 'alias'>,
  content: string,
}

export type Profile = {
  frontmatter: Curator,
  content: string
}

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
    data,
    content
  };
}

export async function augment({ content, meta, data }: BaseProfile) {
  const frontmatter = { alias: meta.author, ...data };
  return { frontmatter, content };
}

export function render({ content, frontmatter }: Profile) {
  return `---
${stringify(frontmatter).trim()}
---

${content}
`
}


export async function write(basePath: string, { content, frontmatter }: Profile) {
  const slug = slugify(frontmatter.alias);
  const markdownFilePath = path.join(basePath, PATH_SUFFIX, `${slug}.md`);
  const profile = render({ content, frontmatter });
  await writeFile(markdownFilePath, profile, 'utf8');
}
