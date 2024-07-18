import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import path from "path";
import sharp from "sharp";

export const prerender = false;

export async function getStaticPaths() {
  const blogEntries = await getCollection('Posts');
  return blogEntries.map(entry => {
    return {
      params: { slug: entry.slug }, props: { entry },
    }
  });
}

export const GET: APIRoute = async function get({ props }) {
  console.log(props.entry.data.bannerImageURL.src);
  const postCover = await sharp(
    process.env.NODE_ENV === 'development'
      ? path.resolve(
        props.entry.data.bannerImageURL.src.replace(/\?.*/, '').replace('/@fs', '/'),
      )
      : path.resolve(props.entry.data.bannerImageURL.src.replace('/', '.vercel/output/static/')),
  ).resize(1200).toBuffer()

  return new Response(postCover, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
