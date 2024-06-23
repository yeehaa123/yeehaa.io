import type { AssociatedArticle } from ".";
import * as ai from "../ai";

export async function generateBanner({ meta, analysis }: AssociatedArticle) {
  const { checksum, title } = meta;
  const { summary, tags } = analysis;
  const prompt = `generate a banner image for a blog post with the following title '${title}', summary: '${summary}' and tags: ${tags.join(", ")}.`
  const response = await ai.image.generate({ prompt, id: checksum });
  return response;
}
