import type { BaseLanding, AssociatedLanding } from ".";
import * as ls from "./schema"
import * as ai from "../ai";

export async function analyze(entity: BaseLanding) {
  const { meta, page_content } = entity;
  const content = JSON.stringify(page_content);
  const { checksum } = meta;
  const id = checksum;
  const summary_length = 600;
  const excerpt_length = 200;
  const min_num_tags = 3;
  const max_num_tags = 5;
  const tag_length = 15;
  const schema = ls.analysisSchema
  const prompt = `Please describe the following landing page in a maximum of ${summary_length} characters for me: 

${content}


Also add ${min_num_tags} to ${max_num_tags} tags. A single tags is a single-word, simple, non-hyphenated and are associated to a href? Only include tags that are really important. Again, only give me the answer. No extra words. Tags can have no more than ${tag_length} characters, are not composed of multiple words and can thus not contain a hyphen, and are all lowercase.

    Additional, add a ${excerpt_length} characters excerpt of the article. No quotations mark please`
  return ai.text.analyze({ prompt, schema, id })
}

export async function augment(_entity: AssociatedLanding, id: string) {
  const schema = ls.analysisSchema
  const prompt = ``
  return await ai.text.analyze({ prompt, schema, id })
}

export async function bannerImage({ description, tags }:
  { description: string, tags: string[] }, checksum: string) {
  const id = `${checksum}-banner`
  const prompt = `
+ Create a visually appealing banner image
+ Imagine you are a photographer that is taking a picture
+ The image should display something that matches the following description '${description}' 
+ And the following tags: ${tags.join(", ")}.
+ Don't show any written words, characters or text in the image. 
+ No typography, just visual elements
+ Keep it illustration only
+ Have a bright background in the brand colors`
  return await ai.image.generate({ prompt, id })
}

export async function profilePicture({ description, tags }:
  { description: string, tags: string[] }, checksum: string) {
  const id = `${checksum}-profile`
  const prompt = `Based on the following description: ${description} and tags: ${tags.join(", ")}
Generate an profile picture`
  return await ai.image.generate({ prompt, id, shape: "SQUARE" });
}
