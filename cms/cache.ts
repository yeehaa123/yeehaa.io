const CACHE_BASE = './.cache';

import { existsSync } from "fs"
import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path';
import type { Checkpoint } from "./course/checkpoint";

type Item = {
  summary: string,
  tags: string[],
  excerpt: string,
}

type CourseAnnotations = {
  description: string
}

export async function init() {
  const dirExists = existsSync(CACHE_BASE);
  if (!dirExists) {
    await mkdir(CACHE_BASE, { recursive: true })
  }
}

export async function getCourse(hash: string) {
  const filePath = path.join(CACHE_BASE, `${hash}.json`);
  const fileExists = existsSync(filePath);
  if (fileExists) {
    const file = await readFile(filePath, 'utf8');
    return JSON.parse(file) as CourseAnnotations;
  }
  return false;
}

export async function setCourse(hash: string, courseAnnotations: CourseAnnotations) {
  console.log("setting item: ", hash);
  const filePath = path.join(CACHE_BASE, `${hash}.json`);
  await writeFile(filePath, JSON.stringify(courseAnnotations, null, 2), 'utf8');
  return courseAnnotations;
}

export async function getCheckpoint(hash: string) {
  const filePath = path.join(CACHE_BASE, `${hash}.json`);
  const fileExists = existsSync(filePath);
  if (fileExists) {
    const file = await readFile(filePath, 'utf8');
    return JSON.parse(file) as Checkpoint;
  }
  return false;
}

export async function getArticle(checksum: string) {
  const filePath = path.join(CACHE_BASE, `${checksum}.json`);
  const fileExists = existsSync(filePath);
  if (fileExists) {
    const file = await readFile(filePath, 'utf8');
    return JSON.parse(file) as Item;
  }
  return false;
}

export async function setCheckpoint(hash: string, checkpoint: Checkpoint) {
  console.log("setting item: ", hash);
  const filePath = path.join(CACHE_BASE, `${hash}.json`);
  await writeFile(filePath, JSON.stringify(checkpoint, null, 2), 'utf8');
  return checkpoint;
}

export async function setArticle(checksum: string, item: Item) {
  console.log("setting item: ", checksum);
  const filePath = path.join(CACHE_BASE, `${checksum}.json`);
  await writeFile(filePath, JSON.stringify(item, null, 2), 'utf8');
  return item;
}

export async function writeImage({ checksum, b64_json }: { checksum: string, b64_json: string }) {
  let buff = Buffer.from(b64_json, 'base64');
  const imageUrl = path.join(CACHE_BASE, `${checksum}.png`);
  await writeFile(imageUrl, buff);
  return path.join(".", `${checksum}.png`);
}

export async function getImage(checksum: string) {
  const imageUrl = path.join(CACHE_BASE, `${checksum}.png`);
  const fileExists = existsSync(imageUrl);
  if (fileExists) {
    return path.join(".", `${checksum}.png`);
  }
  return false;
}


