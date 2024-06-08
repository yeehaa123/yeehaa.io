export default function template({ content, title, frontmatter }: MarkdocArticle) {
  return `---
${yaml.stringify({ title, ...frontmatter }).trim()}
---
${content}
`
}
