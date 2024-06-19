import 'dotenv/config'
import OpenAI from "openai";
import * as cache from '../cache';

type ImageData = {
  summary: string,
  title: string,
  tags: string[],
  content: string,
  checksum: string
}


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function dallEGenerate({ summary, title, tags, checksum }: ImageData) {
  const imageURL = await cache.getImage(checksum);
  if (imageURL) { return imageURL };
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `generate a banner image for a blog post with the following title '${title}', summary: '${summary}' and tags: ${tags.join(", ")}.`,
    n: 1,
    response_format: "b64_json",
    size: "1792x1024",
  });
  const b64_json = response?.data[0]?.b64_json;
  if (b64_json) {
    return cache.writeImage({ checksum, b64_json });
  }
  throw ("PROBLEM WITH OPENAI");
}

export async function SDGenerate({ tags, summary, title, checksum }: ImageData) {
  try {
    const payload = {
      prompt: `generate a banner image in a functional style for a blog post with the following title: '${title}', summary: '${summary}'and ${tags.join(", ")}.`,
      aspect_ratio: "21:9",
      output_format: "png",
    };

    const response = await fetch(
      `https://api.stability.ai/v2beta/stable-image/generate/sd3`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: "application/json",
        },
        body: Object.entries(payload).reduce((d, e) => (d.append(...e), d), new FormData())
      },
    );
    const { image: b64_json } = await response.json();
    if (b64_json) {
      return cache.writeImage({ checksum, b64_json });
    }
    throw ("PROBLEM WITH IMAGE GEN");
  } catch (e) {
    throw (e);
  }
}

export { dallEGenerate as generate }
