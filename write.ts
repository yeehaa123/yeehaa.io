import { existsSync } from "fs"
import { mkdir, rm } from 'fs/promises'

const OUTPUT_BASE = './output';

async function initDir(dirName: string) {
  const outputExists = existsSync(dirName)
  if (outputExists) {
    console.log("CLEANING OUTPUT");
    await rm(dirName, { recursive: true })
    console.log("CLEANED OUTPUT");
  }
  await mkdir(dirName, { recursive: true })
}


function template({ frontmatter, item }) {
  return `---
${frontmatter.trim()}
---
${item}
`
}
