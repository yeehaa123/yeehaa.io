import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import path from "path";
import sharp from "sharp";

export async function getStaticPaths() {
  const seriesEntries = await getCollection('Series');
  return seriesEntries.map(entry => ({
    params: { slug: entry.id }, props: { entry },
  }));
}

export const GET: APIRoute = async function get({ props }) {
  const postCover = await sharp(
    process.env.NODE_ENV === 'development'
      ? path.resolve(
        props.entry.data.bannerImageURL.src.replace(/\?.*/, '').replace('/@fs', ''),
      )
      : path.resolve(props.entry.data.bannerImageURL.src.replace('/', 'dist/')),
  ).resize(1200).toBuffer()

  return new Response(postCover, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
