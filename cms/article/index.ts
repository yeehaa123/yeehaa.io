import type { TableRow } from "../table/tableRow";
import type { ArticleFrontmatter } from "./frontmatter";
import type { Tag, RenderableTreeNode } from '@markdoc/markdoc';
import * as ai from '../ai';
import Markdoc from '@markdoc/markdoc';
import { stringify } from "yaml";
import * as fm from "./frontmatter";
import { generateChecksum } from "../helpers";

export const schema = fm.schema;

export type Article = {
  frontmatter: ArticleFrontmatter,
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
  throw ("ARTICLE NEEDS TITLE");
}

export function parse(content: string) {
  const ast = Markdoc.parse(content);
  const contentTree = Markdoc.transform(ast);
  const title = collectTitle(contentTree);
  return { title };
}

export async function init({ content, series }: { series?: string | undefined, content: string }) {
  const checksum = generateChecksum(content);
  const { title } = parse(content);
  const { summary, tags, excerpt, imageURL } = await ai.augment({ checksum, title, content })
  const frontmatter = fm.init({
    title,
    summary,
    excerpt,
    tags,
    imageURL,
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

  const { summary, tags, excerpt, imageURL } = await ai.augment({
    checksum,
    title: entry.frontmatter.title,
    content: entry.content
  })

  const frontmatter = {
    ...fm.update(entry.frontmatter, tableRow),
    summary,
    tags,
    excerpt,
    imageURL
  }

  return {
    ...entry,
    frontmatter,
  };
}

export function addOrder(entry: Article, order: number) {
  const { frontmatter } = entry;
  return {
    ...entry,
    frontmatter: { ...frontmatter, order }
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
