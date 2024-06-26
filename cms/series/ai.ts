import * as ss from "../series/schema"
import * as ai from "../ai";
import type { AssociatedSeries } from "./schema";

export async function analyze(entity: AssociatedSeries, id: string) {
  const { meta, associations } = entity;
  const { title } = meta;
  const { articles } = associations;;
  const summary_length = 600;
  const excerpt_length = 200;
  const min_num_tags = 6;
  const max_num_tags = 10;
  const tag_length = 7;
  const schema = ss.augmentationsSchema.omit({
    checksum: true,
    bannerImageURL: true
  });
  const prompt = `
Given the following things:
- a series of blog posts with the title '${title}' 
- and the following summary of the posts:

${JSON.stringify(articles, null, 2)}

Please summarize the series for me in a maximum of ${summary_length} characters. Dont use quotation marks

Also add ${min_num_tags} to ${max_num_tags} tags.A single tags is a single - word, simple, non - hyphenated and are associated to a href ? Only include tags that are really important.Again, only give me the answer.No extra words.Tags can have no more than ${tag_length} characters, are not composed of multiple words and can thus not contain a hyphen, and are all lowercase.

  Additional, add a ${excerpt_length} characters excerpt of the article.`
  return await ai.text.analyze({ prompt, schema, id })
}

export async function bannerImage({ summary, tags }:
  { summary: string, tags: string[] }, checksum: string) {
  const id = `${checksum}-banner`
  const prompt = `generate an illustration for a cover page for a series of blog posts with the following description: '${summary}' and tags: ${tags.join(", ")}. The image should not contain any words or text`
  return await ai.image.generate({ prompt, id, shape: "RECT" });
}
