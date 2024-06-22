import * as path from 'path';
import * as cache from './cache';
import * as filetree from "./filetree";
import * as mt from "./metaTable";
import * as ot from "./outputTable";
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
  await mt.init(CMS_PATH);
  await cache.init();

  const tree = await filetree.create(INPUT_BASE);
  const metaTableData = await mt.read(CMS_PATH);

  filetree.update(tree, metaTableData);
  const seriesGroup = series.group(metaTableData);
  const seriesData = series.order(seriesGroup);
  filetree.update(tree, seriesData);

  const outputTable = filetree.toOutputTable(tree);
  const analyzedTable = await ot.analyze(outputTable);
  const associatedTable = ot.associate(analyzedTable);
  const augmentedTable = await ot.augment(associatedTable);

  await ot.write(OUTPUT_BASE, augmentedTable);

  const metaTable = filetree.toMetaTable(tree);
  await mt.write(CMS_PATH, metaTable);
}

main();
