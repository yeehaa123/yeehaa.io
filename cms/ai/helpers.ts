import * as cache from '../cache';

type AIImageProps = {
  prompt: string,
  id: string
}

export async function SDGenerate({ prompt, id }: AIImageProps) {
  try {
    const payload = {
      prompt,
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
      return cache.writeImage({ checksum: id, b64_json });
    }
    throw ("PROBLEM WITH IMAGE GEN");
  } catch (e) {
    throw (e);
  }
}

