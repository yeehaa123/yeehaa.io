import * as path from 'path';
import * as cache from './cache';
import * as filetree from "./filetree";
import * as mt from "./metaTable";
import * as ot from "./outputTable";
import * as series from "./series";
import * as article from "./article";
import * as course from "./course";
import * as landing from "./landing";
import * as profile from "./profile";
import * as tags from "./tag";
import * as collections from "./collections";
import { initDirs } from "./helpers";


const OUTPUT_BASE = './src/content';
const INPUT_BASE = './yeehaa';
const CMS_PATH = path.join(OUTPUT_BASE, "CMS");

export const PATH_SUFFIXES = [
  article.PATH_SUFFIX,
  course.PATH_SUFFIX,
  profile.PATH_SUFFIX,
  series.PATH_SUFFIX,
  tags.PATH_SUFFIX,
  landing.PATH_SUFFIX,
];

async function main() {
  await initDirs(OUTPUT_BASE, PATH_SUFFIXES);
  await mt.init(CMS_PATH);
  await cache.init();

  const tree = await filetree.create(INPUT_BASE);
  const metaTableData = await mt.read(CMS_PATH);
  filetree.update(tree, metaTableData);

  const outputTable = filetree.toOutputTable(tree);
  const analyzedTable = await ot.analyze(outputTable);
  const seriesTable = collections.deriveSeries(analyzedTable);
  const tagsTable = collections.deriveTags(analyzedTable);

  const associatedTable = ot.associate([...analyzedTable, ...seriesTable, ...tagsTable]);
  const augmentedTable = await ot.augment(associatedTable);

  await ot.write(OUTPUT_BASE, augmentedTable);
  const metaTable = filetree.toMetaTable(tree);
  await mt.write(CMS_PATH, metaTable);
}

main();
