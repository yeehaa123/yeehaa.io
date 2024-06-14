const CACHE_BASE = './.cache';

import { existsSync } from "fs"
import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path';

type Item = {
  summary: string,
  tags: string[],
  imageURL: string,
  excerpt: string,
}

export async function init() {
  const dirExists = existsSync(CACHE_BASE);
  if (!dirExists) {
    await mkdir(CACHE_BASE, { recursive: true })
  }
}

export async function get(checksum: string) {
  const filePath = path.join(CACHE_BASE, `${checksum}.json`);
  const fileExists = existsSync(filePath);
  if (fileExists) {
    const file = await readFile(filePath, 'utf8');
    return JSON.parse(file) as Item;
  }
  return false;
}

export async function set(checksum: string, item: Item) {
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

