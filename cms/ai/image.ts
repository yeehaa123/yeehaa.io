import 'dotenv/config'
import OpenAI from "openai";
import * as cache from '../cache';
import colors from "../../styles/colorSchemes/BambooCurtain";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generate({ summary, title, checksum }: { summary: string, title: string, checksum: string }) {
  const imageURL = await cache.getImage(checksum);
  if (imageURL) { return imageURL };
  const { primary, secondary } = colors;
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `generate a banner image in a brutalist style matching the following colors: ${primary} and ${secondary} that matches the blog post with the following title '${title}' and summary: ${summary}`,
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

