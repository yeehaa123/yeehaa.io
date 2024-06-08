import * as cache from './cache';

async function analyze(_content: string) {
  const summary = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  const tags = ["One", "Two", "Three"];
  return {
    summary,
    tags
  }
}

export async function augment({ checksum, content }: { checksum: string, content: string }) {
  const cachedItem = await cache.get(checksum);
  if (cachedItem) {
    return cachedItem;
  }
  const item = await analyze(content);
  await cache.set(checksum, item);
  return item;
}
