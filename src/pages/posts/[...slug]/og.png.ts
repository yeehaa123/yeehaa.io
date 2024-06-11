import type { APIRoute } from "astro";
import { readFile } from "fs/promises";
import { getCollection } from "astro:content";
import path from "path";
import { getImage } from "astro:assets";

export async function getStaticPaths() {
  const blogEntries = await getCollection('Posts');
  return blogEntries.map(entry => ({
    params: { slug: entry.slug }, props: { entry },
  }));
}
export const GET: APIRoute = async function get({ props }) {
  const postCover = await readFile(
    process.env.NODE_ENV === 'development'
      ? path.resolve(
        props.entry.data.imageURL.src.replace(/\?.*/, '').replace('/@fs', ''),
      )
      : path.resolve(props.entry.data.imageURL.src.replace('/', 'dist/')),
  );
  return new Response(postCover, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
