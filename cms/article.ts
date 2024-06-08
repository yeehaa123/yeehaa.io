import type { Frontmatter } from "./frontmatter";
import type { Tag, RenderableTreeNode } from '@markdoc/markdoc';

import Markdoc from '@markdoc/markdoc';

import { stringify } from "yaml";
import * as frontmatter from "./frontmatter";
import { generateChecksum } from "./helpers";

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

export function init({ content, series }: { series?: string, content: string }) {
  const checksum = generateChecksum(content);
  const ast = Markdoc.parse(content);
  const contentTree = Markdoc.transform(ast);
  const title = collectTitle(contentTree);
  return {
    frontmatter: frontmatter.init({
      title,
      series,
      checksum
    }),
    content
  };
}

export function update(entry: Article, frontmatter: Frontmatter) {
  return {
    ...entry,
    frontmatter
  };
}

export function render({ content, frontmatter }: Article) {
  return `---
${stringify({ frontmatter }).trim()}
---
${content}
`
}
