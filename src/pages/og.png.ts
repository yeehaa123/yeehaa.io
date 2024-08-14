import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import sharp from "sharp";

import fs from 'fs';

async function base64_encode(imageResult: string) {
  var bitmap = fs.readFileSync(imageResult);
  const postCover = await sharp(
    bitmap
  ).resize(1200).toBuffer()
  return postCover;
}

export const GET: APIRoute = async function get() {
  const entry = await getEntry("LandingPage", "index")
  const imageData = entry.data.bannerImageURL;
  const image = await base64_encode(imageData.fsPath);
  return new Response(image, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
