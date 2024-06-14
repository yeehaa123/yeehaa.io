import type { TableRow } from "../table/tableRow";
import type { ArticleFrontmatter } from "./frontmatter";
import type { Tag, RenderableTreeNode } from '@markdoc/markdoc';
import * as path from 'path';
import Markdoc from '@markdoc/markdoc';
import { stringify } from "yaml";
import { writeFile } from 'fs/promises'
import * as fm from "./frontmatter";
import * as tr from "../table/tableRow";
import { generateChecksum } from "../helpers";

export const schema = fm.schema;

export type Article = {
  frontmatter: ArticleFrontmatter,
  content: string,
}

export type BaseArticle = {
  meta: TableRow,
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
  const meta = tr.init({
    title,
    contentType: tr.ContentType.ARTICLE,
    author: "Yeehaa",
    series,
    checksum
  })
  return {
    meta,
    content
  };
}

export function render({ content, frontmatter }: Article) {
  return `---
${stringify({ ...frontmatter }).trim()}
---

${content}
`
}

export async function write(basePath: string, entry: Article) {
  fm.validate(entry.frontmatter);
  const filePath = path.join(basePath, `${entry.frontmatter.slug}.md`);
  const file = render(entry);
  await writeFile(filePath, file, 'utf8');
}
