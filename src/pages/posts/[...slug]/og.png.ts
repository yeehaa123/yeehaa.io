import type { APIRoute } from "astro";
import path from "path";
import sharp from "sharp";

export const prerender = false


export const GET: APIRoute = async function get({ props }) {
  const postCover = await sharp(
    process.env.NODE_ENV === 'development'
      ? path.resolve(
        props.entry.data.bannerImageURL.src.replace(/\?.*/, '').replace('/@fs', '/'),
      )
      : path.resolve(props.entry.data.bannerImageURL.src.replace('/', '/')),
  ).resize(1200).toBuffer()

  return new Response(postCover, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
