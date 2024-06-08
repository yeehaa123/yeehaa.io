import * as path from 'path';
import * as cache from './cache';
import * as filetree from "./filetree";
import * as table from "./table";
import { initDir, initTable } from "./helpers";

const OUTPUT_BASE = './output';
const INPUT_BASE = './yeehaa';
const OUTPUT_DIR = path.join(OUTPUT_BASE, INPUT_BASE);
const TABLE_PATH = path.join(OUTPUT_BASE, './contentTable.json');

async function main() {
  await initDir(OUTPUT_DIR);
  await initTable(TABLE_PATH);
  await cache.init();

  const tree = await filetree.create(INPUT_BASE);
  const tableData = await table.read(TABLE_PATH);


  await filetree.update(tree, tableData);
  await filetree.validate(tree);

  await filetree.write(OUTPUT_DIR, tree);
  await table.write(TABLE_PATH, tree);
}

main();
