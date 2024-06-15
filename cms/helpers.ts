import { existsSync } from "fs"
import crypto from "crypto"
import voca from "voca";
import { mkdir, rm } from 'fs/promises'
import path from "path";

export async function initDir(dirName: string) {
  try {
    const outputExists = existsSync(dirName)
    if (outputExists) {
      console.log("CLEANING OUTPUT", dirName);
      await rm(dirName, { recursive: true })
      console.log("CLEANED OUTPUT");
    }
    await mkdir(dirName, { recursive: true })
  }
  catch (e) {
    console.log(e);
  }
}

export async function initDirs(baseDir: string, extensions: string[]) {
  for (const extension of extensions) {
    const dirName = path.join(baseDir, extension);
    await initDir(dirName);
  }
}

export function deslugify(slug: string) {
  return voca
    .chain(slug)
    .replaceAll("-", " ")
    .titleCase()
    .value();
}

export function generateChecksum(str: string) {
  return crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex');
}
