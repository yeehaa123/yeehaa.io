import type { Frontmatter } from "./frontmatter";
import type { Tag, RenderableTreeNode } from '@markdoc/markdoc';
import * as ai from './ai';

import Markdoc from '@markdoc/markdoc';

import { stringify } from "yaml";
import * as fm from "./frontmatter";
import { generateChecksum } from "./helpers";
import type { TableRow } from "./table";

export type Article = {
  frontmatter: Frontmatter
  content: string,
}

function isTag(node: RenderableTreeNode): node is Tag {
  return (node as Tag).name !== undefined;
}

function collectTitle(node: RenderableTreeNode, sections = []): string {
  if (node && isTag(node)) {
    if (node.name.match(/h1/)) {
      return node.children[0] as string;
    }
    if (node.children) {
      for (const child of node.children) {
        return collectTitle(child, sections);
      }
    }
  }
}

export function parse(content: string) {
  const ast = Markdoc.parse(content);
  const contentTree = Markdoc.transform(ast);
  const title = collectTitle(contentTree);
  return { title };
}

export async function init({ content, series }: { series?: string, content: string }) {
  const checksum = generateChecksum(content);
  const { title } = parse(content);
  const { summary, tags, excerpt } = await ai.augment({ checksum, content })
  const frontmatter = fm.init({
    title,
    summary,
    excerpt,
    tags,
    author: "Yeehaa",
    series,
    checksum
  })
  return {
    frontmatter,
    content
  };
}

export async function update(entry: Article, tableRow: TableRow) {
  const { checksum, draft } = tableRow;
  const checksumChanged = entry.frontmatter.checksum !== checksum;
  const statusChanged = entry.frontmatter.draft !== draft;
  const isUpdated = checksumChanged || statusChanged;
  if (!isUpdated) { return entry }
  const frontmatter = fm.update(entry.frontmatter, tableRow)
  const { summary, tags } = await ai.augment({ checksum, content: entry.content })
  return {
    ...entry,
    frontmatter,
    summary,
    tags
  };
}
export async function validate(entry: Article) {
  return fm.validate(entry.frontmatter);
}

export function render({ content, frontmatter }: Article) {

  return `---
${stringify({ ...frontmatter }).trim()}
---

${content}
`
}
