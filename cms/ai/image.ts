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
  shape?: "RECT" | "SQUARE",
  style?: "NATURAL" | "VIVID"
}

export async function generate({ prompt, id, shape, style }: AIImageProps) {
  const imageURL = await cache.getImage(id);
  if (imageURL) { return imageURL };
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt + styleAddition,
    n: 1,
    quality: 'hd',
    style: style === "NATURAL" ? "natural" : "vivid",
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

// just for future need...
export async function SDGenerate({ prompt, id }: AIImageProps) {
  const payload = {
    prompt: prompt + styleAddition,
    aspect_ratio: "16:9",
    style_preset: "pixel-art",
    output_format: "png",
  };

  try {
    const response = await fetch(
      `https://api.stability.ai/v2beta/stable-image/generate/core`,
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
      return cache.writeImage({ id, b64_json });
    }
    throw ("PROBLEM WITH IMAGE GEN");
  } catch (e) {
    throw (e);
  }
}

