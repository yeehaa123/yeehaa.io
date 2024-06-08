import type { Frontmatter } from "./frontmatter";
import { stringify } from "yaml";
import * as frontmatter from "./frontmatter";

export type Article = {
  title: string
  frontmatter: Frontmatter
  content: string,
}

export function init(
  { title, series, content }:
    { title: string, series?: string, content: string }) {
  const fm = frontmatter.init({ series });
  return {
    title,
    frontmatter: fm,
    content
  };
}

export function update(entry: Article, frontmatter: Frontmatter) {
  return {
    ...entry,
    frontmatter
  };
}

export function render({ content, title, frontmatter }: Article) {
  return `---
${stringify({ title, ...frontmatter }).trim()}
---
${content}
`
}
