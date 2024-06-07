import { existsSync } from "fs"
import { readdir, lstat, readFile, mkdir, rm, writeFile } from 'fs/promises'
import voca from "voca";
import * as path from 'path';
import { stringify } from "yaml";
import Markdoc from '@markdoc/markdoc';
import type { Tag, RenderableTreeNode } from '@markdoc/markdoc';

const OUTPUT_BASE = './output';
const INPUT_BASE = './yeehaa';
const TABLE_PATH = path.join('./contentTable.json');

type Frontmatter = {
  author: string,
  series?: string,
  draft: boolean,
  createdAt: Date,
  publishedAt: Date | undefined

}

type MarkdocArticle = {
  title: string
  frontmatter: Frontmatter
  content: string,
}

type FileTree = Map<string, MarkdocArticle>

function isTag(node: RenderableTreeNode): node is Tag {
  return (node as Tag).name !== undefined;
}

function collectTitle(node: RenderableTreeNode, sections = []): string {
  if (node && isTag(node)) {
    if (node.name.match(/h1/)) {
      const title = node.children[0];
      return title as string;
    }
    if (node.children) {
      for (const child of node.children) {
        return collectTitle(child, sections);
      }
    }
  }
}

async function processFile(filePath: string, series?: string) {
  try {
    const item = await readFile(filePath, 'utf8');
    const ast = Markdoc.parse(item);
    const content = Markdoc.transform(ast);
    const title = collectTitle(content);
    const frontmatter = {
      series,
      author: "Yeehaa",
      draft: true,
      createdAt: new Date,
      publishedAt: undefined,
    };
    return {
      title,
      frontmatter,
      content: item
    };
  } catch (e) {
    console.log(e, filePath);
  }
}

async function processDir(tree: FileTree, dirPath: string) {
  const seriesPath = path.parse(dirPath)
  const seriesSlug = seriesPath.name;
  const seriesName = voca
    .chain(seriesSlug)
    .replaceAll("-", " ")
    .titleCase()
    .value();
  const dir = await readdir(dirPath);
  for (const ext of dir) {
    const filePath = path.join(dirPath, ext);
    const processedFile = await processFile(filePath, seriesName);
    tree.set(processedFile.title, processedFile);
  }
  return tree
}

async function createTree() {
  const dir = await readdir(INPUT_BASE);
  const tree = new Map;
  for (const ext of dir) {
    const newPath = path.join(INPUT_BASE, ext);
    const stats = await lstat(newPath)
    if (stats.isDirectory()) {
      console.log("ENTERING DIR: ", ext);
      await processDir(tree, newPath);
    } else {
      const processedFile = await processFile(newPath);
      tree.set(processedFile.title, processedFile);
    }
  }
  return tree;
}

async function initDir(dirName: string) {
  const outputExists = existsSync(dirName)
  if (outputExists) {
    console.log("CLEANING OUTPUT");
    await rm(dirName, { recursive: true })
    console.log("CLEANED OUTPUT");
  }
  await mkdir(dirName, { recursive: true })
}


function template({ content, title, frontmatter }: MarkdocArticle) {
  return `---
${stringify({ title, ...frontmatter }).trim()}
---
${content}
`
}

async function writeTree(tree: FileTree) {
  for (const [title, entry] of tree) {
    const fileName = `${voca.slugify(title)}.md`;
    const filePath = path.join(OUTPUT_BASE, fileName);
    const file = template(entry);
    writeFile(filePath, file, 'utf8');
  }
}

async function writeTable(tree: FileTree) {
  const table = Array.from(tree).map(([key, { frontmatter }]) => {
    const { draft, createdAt, publishedAt } = frontmatter;
    return [key, { draft, createdAt, publishedAt }]
  })
  await writeFile(TABLE_PATH, JSON.stringify(table, null, 2), 'utf8');
}

async function initTable(path: string) {
  try {
    const tableExists = existsSync(path);
    if (!tableExists) {
      console.log("CREATING TABLE: ", TABLE_PATH);
      await writeFile(TABLE_PATH, JSON.stringify([]), 'utf8');
    }
  }
  catch (e) {
    console.log(e);
  }

}

async function checkTable(tree: FileTree) {
  const tableJSON = await readFile(TABLE_PATH, 'utf8');
  const tableData = JSON.parse(tableJSON) as [key: string, Frontmatter][]
  for (const [title, { draft, createdAt, publishedAt }] of tableData) {
    const { frontmatter, ...rest } = tree.get(title);
    tree.set(title, {
      ...rest,
      frontmatter: {
        ...frontmatter,
        createdAt,
        draft,
        publishedAt: draft ? undefined : publishedAt ? publishedAt : new Date
      }
    });
  }
  return tree;
}


async function main() {
  await initDir(OUTPUT_BASE);
  await initTable(TABLE_PATH);

  const tree = await createTree();
  const updatedTree = await checkTable(tree);

  await writeTree(updatedTree);
  await writeTable(updatedTree);
}

main();

