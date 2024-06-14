import * as cache from '../cache';
import * as image from "./image";
import * as article from "./article";

export async function augment({ checksum, title, content }:
  { checksum: string, title: string, content: string }) {
  const cachedItem = await cache.get(checksum);
  if (cachedItem) { return cachedItem; }
  const { summary, tags, excerpt } = await article.analyze({ title, content });
  const imageURL = await image.generate({ title, summary, checksum });
  return cache.set(checksum, { summary, tags, excerpt, imageURL });
}
