import * as path from 'path';
import * as cache from './cache';
import * as filetree from "./filetree";
import * as table from "./table";
import * as series from "./series";
import { initDir } from "./helpers";

const OUTPUT_BASE = './src/content';
const INPUT_BASE = './yeehaa';
const OUTPUT_DIR = path.join(OUTPUT_BASE, "Posts");
const CMS_PATH = path.join(OUTPUT_BASE, "CMS");

async function main() {
  await initDir(OUTPUT_DIR);
  await table.init(CMS_PATH);
  await cache.init();

  const tree = await filetree.create(INPUT_BASE);
  const tableData = await table.read(CMS_PATH);
  filetree.update(tree, tableData);

  const seriesGroup = series.group(tableData);
  const updatedTable = series.order(seriesGroup);
  filetree.update(tree, updatedTable);

  await filetree.write(OUTPUT_DIR, tree);
  await table.write(CMS_PATH, tree);
}

main();
