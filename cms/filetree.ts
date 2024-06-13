import type { Article } from "./article";
import type { Frontmatter } from "./frontmatter";
import voca from "voca";
import * as path from 'path';
import { readdir, copyFile, lstat, readFile, writeFile } from 'fs/promises'
import * as article from "./article";
import * as course from "./course";
import { deslugify } from "./helpers";

export type FileTree = Map<string, Article>

async function processFile(filePath: string, series?: string) {
  try {
    const { ext } = path.parse(filePath);
    const item = await readFile(filePath, 'utf8');
    if (ext === ".md") {
      return article.init({ series, content: item })
    } else if (ext === '.offcourse') {
      const newCourse = await course.init({ content: item })
      console.log(newCourse);
    }
    return false;
  } catch (e) {
    throw (e);
  }
}

async function processDir(tree: FileTree, dirPath: string) {
  const seriesPath = path.parse(dirPath)
  const seriesSlug = seriesPath.name;
  const seriesName = deslugify(seriesSlug);
  const dir = await readdir(dirPath);
  for (const ext of dir) {
    const filePath = path.join(dirPath, ext);
    const processedFile = await processFile(filePath, seriesName);
    if (processedFile) {
      const { title } = processedFile.frontmatter;
      tree.set(title, processedFile);
    }
  }
}

export async function create(basePath: string): Promise<FileTree> {
  const dir = await readdir(basePath);
  const tree = new Map;
  for (const ext of dir) {
    const newPath = path.join(basePath, ext);
    const stats = await lstat(newPath)
    if (stats.isDirectory()) {
      console.log("ENTERING DIR: ", ext);
      await processDir(tree, newPath);
    } else {
      const processedFile = await processFile(newPath);
      if (processedFile) {
        const { title } = processedFile.frontmatter;
        tree.set(title, processedFile);
      }
    }
  }
  return tree;
}

export async function update(tree: FileTree, tableData: Frontmatter[]) {
  for (const tableRow of tableData) {
    const { title } = tableRow;
    const entry = tree.get(title);
    if (entry) {
      const newEntry = await article.update(entry, tableRow);
      tree.set(title, newEntry);
    }
  }
}

export function order(tree: FileTree) {
  const publishedInSeries = Array.from(tree).filter(([_, { frontmatter }]) => {
    return frontmatter.series && frontmatter.publishedAt
  }).sort(([_a, a], [_b, b]) => {
    if (a.frontmatter.publishedAt && b.frontmatter.publishedAt) {
      return a.frontmatter.publishedAt.getTime() - b.frontmatter.publishedAt.getTime();
    } else {
      return -1
    }
  });

  publishedInSeries.forEach(([title, entry], index) => {
    tree.set(title, article.addOrder(entry, index));
  })
}

export async function validate(tree: FileTree) {
  for (const [_title, entry] of tree) {
    article.validate(entry);
  }
}

export async function write(basePath: string, tree: FileTree) {
  for (const [title, entry] of tree) {
    if (!entry.frontmatter.draft) {
      const { checksum } = entry.frontmatter;
      const fileSlug = `${voca.slugify(title)}`;
      const filePath = path.join(basePath, `${fileSlug}.md`);
      const imgSrc = path.join('./.cache', `${checksum}.png`);
      const imgDest = path.join(basePath, `${checksum}.png`);
      await copyFile(imgSrc, imgDest);
      const file = article.render(entry);
      await writeFile(filePath, file, 'utf8');
    }
  }
}
