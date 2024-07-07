import type { AssociatedArticle } from ".";
import * as ai from "../ai";
import * as as from "./schema";

export async function generateBanner({ meta, analysis }: AssociatedArticle) {
  const { checksum, title } = meta;
  const { description, tags } = analysis;
  const prompt = `generate a banner image for a blog post with the following title '${title}', summary: '${description}' and tags: ${tags.join(", ")}.`
  const response = await ai.image.generate({ prompt, id: checksum });
  return response;
}

export async function analyzeArticle({ checksum, content, title }: { checksum: string, content: string, title: string }) {
  const id = checksum;
  const schema = as.analysisSchema;
  const summary_length = 600;
  const excerpt_length = 200;
  const min_num_tags = 3;
  const max_num_tags = 5;
  const tag_length = 7;
  const prompt = `Please summarize the following article with the title '${title}' in a maximum of ${summary_length} characters for me: 

${content}


Also add ${min_num_tags} to ${max_num_tags} tags. A single tags is a single-word, simple, non-hyphenated and are associated to a href? Only include tags that are really important. Again, only give me the answer. No extra words. Tags can have no more than ${tag_length} characters, are not composed of multiple words and can thus not contain a hyphen, and are all lowercase.

    Additional, add a ${excerpt_length} characters excerpt of the article. No quotations mark please`
  return ai.text.analyze({ prompt, schema, id })
}

