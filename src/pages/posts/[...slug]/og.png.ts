import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import sharp from "sharp";

import fs from 'fs';

async function base64_encode(imageResult: string) {
  var bitmap = fs.readFileSync(imageResult);
  const postCover = await sharp(
    bitmap
  ).resize(1200).toBuffer()
  return postCover;
}

export async function getStaticPaths() {
  const blogEntries = await getCollection('Posts');
  return blogEntries.map(entry => {
    const imageData = entry.data.bannerImageURL;
    // @ts-ignore
    const image = base64_encode(imageData.fsPath);
    return {
      params: { slug: entry.slug }, props: { image },
    }
  });
}

export const GET: APIRoute = async function get({ props }) {
  const image = await props.image;
  return new Response(image, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
