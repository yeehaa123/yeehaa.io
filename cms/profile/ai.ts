import type { BaseProfile, AssociatedProfile } from ".";
import * as ps from "../profile/schema"
import * as ai from "../ai";

export async function analyze(entity: BaseProfile) {
  const { meta, profile } = entity;
  const { checksum } = meta;
  const id = checksum;
  const { alias, name, socials, bio } = profile;
  const description_length = 600;
  const blurb_length = 200;
  const min_num_tags = 3;
  const max_num_tags = 5;
  const tag_length = 7;
  const schema = ps.analysisSchema.omit({ profile: true })
  const prompt = `
Analyze the content of the following linkedin profile: '${socials.linkedin}'.

It belongs to a person with the following name '${name}', alias '${alias}', and bio '${bio}'

Please describe this person's bio in a maximum of ${description_length} characters for me. Carefully consider his/her education, work experience and accomplished skills. Don't mention the persons actual name. Only the alias. No quotation marks please.

Also add ${min_num_tags} to ${max_num_tags} tags. A single tags is a single-word, simple, non-hyphenated and are associated to a href? Only include tags that are really important. Again, only give me the answer. No extra words. Tags can have no more than ${tag_length} characters, are not composed of multiple words and can thus not contain a hyphen, and are all lowercase.

    Additional, add a ${blurb_length} characters excerpt of the article. No quotations marks please.`
  return await ai.text.analyze({ prompt, schema, id })
}

export async function augment(entity: AssociatedProfile, id: string) {
  const { profile, analysis, associations } = entity;
  const { bio, tags } = analysis;
  const summary_length = 600;
  const excerpt_length = 200;
  const min_num_tags = 6;
  const max_num_tags = 10;
  const tag_length = 7;
  const schema = ps.augmentationsSchema.omit({
    checksum: true,
    profileImageURL: true,
  });
  const prompt = `
Given the following things:
- a person that goes by the name of ${profile.alias}
- that is best described by the following keywords: '${tags.join(", ")}'.
- wrote the following blog posts: '${JSON.stringify(associations.articles, null, 2)}
- and curated the following courses: '${JSON.stringify(associations.courses, null, 2)}'
- and has the following bio: '${bio}'

Please descibe the profile is person for me in a maximum of ${summary_length} characters. Include both facts from his bio and his work.

Also add ${min_num_tags} to ${max_num_tags} tags.A single tags is a single - word, simple, non - hyphenated and are associated to a href ? Only include tags that are really important.Again, only give me the answer.No extra words.Tags can have no more than ${tag_length} characters, are not composed of multiple words and can thus not contain a hyphen, and are all lowercase.

  Additional, add a ${excerpt_length} characters excerpt of the article.`
  return await ai.text.analyze({ prompt, schema, id })
}

export async function bannerImage({ description, tags }:
  { description: string, tags: string[] }, checksum: string) {
  const id = `${checksum}-banner`
  const prompt = `generate a banner image for a profile page with the following description: '${description}' and tags: ${tags.join(", ")}.`
  return await ai.image.generate({ prompt, id });
}

export async function profilePicture({ description, tags }:
  { description: string, tags: string[] }, checksum: string) {
  const id = `${checksum}-profile`
  const prompt = `Based on the following description: ${description} and tags: ${tags.join(", ")}
Generate an profile picture`
  return await ai.image.generate({ prompt, id, shape: "SQUARE" });
}
