import type { Profile } from "cms/profile";
import { stringify } from "yaml";
import * as path from 'path';
import { writeFile } from 'fs/promises'
import { slugify } from "../helpers";

export const PATH_SUFFIX = "People"

export async function write(basePath: string, { frontmatter }: Profile) {
  const slug = slugify(frontmatter.alias);
  const dataFilePath = path.join(basePath, PATH_SUFFIX, `${slug}.yaml`);
  const dataFile = stringify(frontmatter);
  await writeFile(dataFilePath, dataFile, 'utf8');
}
