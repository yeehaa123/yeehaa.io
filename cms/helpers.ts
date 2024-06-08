import { existsSync } from "fs"
import crypto from "crypto"
import voca from "voca";
import { mkdir, rm, writeFile } from 'fs/promises'

export async function initDir(dirName: string) {
  try {
    const outputExists = existsSync(dirName)
    if (outputExists) {
      console.log("CLEANING OUTPUT");
      await rm(dirName, { recursive: true })
      console.log("CLEANED OUTPUT");
    }
    await mkdir(dirName, { recursive: true })
  }
  catch (e) {
    console.log(e);
  }
}

export async function initTable(path: string) {
  try {
    const tableExists = existsSync(path);
    if (!tableExists) {
      console.log("CREATING TABLE: ", path);
      await writeFile(path, JSON.stringify([]), 'utf8');
    }
  }
  catch (e) {
    console.log(e);
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
