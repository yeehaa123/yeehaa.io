import 'dotenv/config'
import colors from "../../styles/colorSchemes/BambooCurtain";
import OpenAI from "openai";
import * as cache from '../cache';

const { primary, secondary } = colors;
const styleAddition = `

Try to use the following primary color: '${primary}' and secondary color: '${secondary}' in the image`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type AIImageProps = {
  prompt: string,
  id: string
  shape?: "RECT" | "SQUARE"
}

export async function generate({ prompt, id, shape }: AIImageProps) {
  const imageURL = await cache.getImage(id);
  if (imageURL) { return imageURL };
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt + styleAddition,
    n: 1,
    quality: 'hd',
    style: 'vivid',
    response_format: "b64_json",
    size: shape === "SQUARE" ? "1024x1024" : "1792x1024",
  });
  const b64_json = response?.data[0]?.b64_json;
  console.log(id, response?.data[0]?.revised_prompt);
  if (b64_json) {
    return cache.writeImage({ id, b64_json });
  }
  throw ("PROBLEM WITH OPENAI");
}
