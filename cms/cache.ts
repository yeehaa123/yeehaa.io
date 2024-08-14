const CACHE_BASE = './.cache';

import { existsSync } from "fs"
import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path';

export async function init() {
  const dirExists = existsSync(CACHE_BASE);
  if (!dirExists) {
    await mkdir(CACHE_BASE, { recursive: true })
  }
}

export async function getItem(id: string) {
  const filePath = path.join(CACHE_BASE, `${id}.json`);
  const fileExists = existsSync(filePath);
  if (fileExists) {
    const file = await readFile(filePath, 'utf8');
    return JSON.parse(file)
  }
  return false;
}

export async function setItem(checksum: string, item: any) {
  const filePath = path.join(CACHE_BASE, `${checksum}.json`);
  await writeFile(filePath, JSON.stringify(item, null, 2), 'utf8');
  return item;
}

export async function writeImage({ id, b64_json }: { id: string, b64_json: string }) {
  let buff = Buffer.from(b64_json, 'base64');
  const imageUrl = path.join(CACHE_BASE, `${id}.png`);
  await writeFile(imageUrl, buff);
  return path.join(".", `${id}.png`);
}

export async function getImage(id: string) {
  const imageUrl = path.join(CACHE_BASE, `${id}.png`);
  const fileExists = existsSync(imageUrl);
  if (fileExists) {
    return path.join(".", `${id}.png`);
  }
  return false;
}
