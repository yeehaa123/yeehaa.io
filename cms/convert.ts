import * as path from 'path';
import * as cache from './cache';
import * as filetree from "./filetree";
import * as table from "./table";
import * as series from "./series";
import * as article from "./article";
import * as course from "./course";
import * as profile from "./profile";
import * as people from "./people";
import { initDirs } from "./helpers";


const OUTPUT_BASE = './src/content';
const INPUT_BASE = './yeehaa';
const CMS_PATH = path.join(OUTPUT_BASE, "CMS");

export const PATH_SUFFIXES = [
  article.PATH_SUFFIX,
  course.PATH_SUFFIX,
  profile.PATH_SUFFIX,
  people.PATH_SUFFIX
];

async function main() {
  await initDirs(OUTPUT_BASE, PATH_SUFFIXES);
  await table.init(CMS_PATH);
  await cache.init();

  const tree = await filetree.create(INPUT_BASE);
  const tableData = await table.read(CMS_PATH);
  filetree.update(tree, tableData);

  const seriesGroup = series.group(tableData);
  const updatedTable = series.order(seriesGroup);

  filetree.update(tree, updatedTable);

  filetree.associate(tree, tableData);

  await filetree.write(OUTPUT_BASE, tree);
  await table.write(CMS_PATH, tree);
}

main();
