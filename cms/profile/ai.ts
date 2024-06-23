import type { BaseProfile, AssociatedProfile } from ".";
import * as cache from '../cache';
import { createOpenAI } from '@ai-sdk/openai';
import * as ps from "../profile/schema"
import { generateObject } from 'ai';

const vercel = createOpenAI({ apiKey: process.env.OPENAI_API_KEY || "FAKE_KEY" });

export async function analyze(entity: BaseProfile) {
  const { meta, profile, bio } = entity;
  const { checksum } = meta;
  const key = `${checksum}-analysis`;
  const cachedItem = await cache.getProfile(key);
  if (cachedItem) { return cachedItem; }

  const { alias, socials } = profile;
  const description_length = 600;
  const blurb_length = 200;
  const min_num_tags = 3;
  const max_num_tags = 5;
  const tag_length = 7;
  const { object } = await generateObject({
    model: vercel('gpt-4o'),
    schema: ps.analysisSchema,
    prompt: `
Carefully analyze the content of the following linkedin profile: '${socials.linkedin}'.

It belongs to a person with the following alias ${alias} and bio: 

${bio}

Please describe this person in a maximum of ${description_length} characters for me. No quotation marks please.

Also add ${min_num_tags} to ${max_num_tags} tags. A single tags is a single-word, simple, non-hyphenated and are associated to a href? Only include tags that are really important. Again, only give me the answer. No extra words. Tags can have no more than ${tag_length} characters, are not composed of multiple words and can thus not contain a hyphen, and are all lowercase.

    Additional, add a ${blurb_length} characters excerpt of the article.`
  });
  const { description, tags, blurb } = object;
  if (description && tags && blurb) {
    return cache.setProfile(key, { description, tags, blurb });
  }
  throw ("PROBLEM WITH AI");
}

export async function augment(entity: AssociatedProfile) {
  const { meta, profile, bio, analysis, associations } = entity;
  const { checksum } = meta;
  const key = `${checksum}-augmentation`;
  const cachedItem = await cache.getProfile(key);
  if (cachedItem) { return cachedItem; }
  const summary_length = 600;
  const excerpt_length = 200;
  const min_num_tags = 6;
  const max_num_tags = 10;
  const tag_length = 7;
  const { object } = await generateObject({
    model: vercel('gpt-4o'),
    schema: ps.augmentationsSchema,
    prompt: `Please summarize the profile of the following person for me in a maximum of ${summary_length} characters for me: 

This person goes by the name of ${profile.alias}

This is the bio text ${bio} this person uses.

He or she wrote the following blog posts: ${JSON.stringify(associations.articles, null, 2)}

And curated the following courses: ${JSON.stringify(associations.courses, null, 2)}

You made the following analysis earlier: ${JSON.stringify(analysis, null, 2)}

Also add ${min_num_tags} to ${max_num_tags} tags.A single tags is a single - word, simple, non - hyphenated and are associated to a href ? Only include tags that are really important.Again, only give me the answer.No extra words.Tags can have no more than ${tag_length} characters, are not composed of multiple words and can thus not contain a hyphen, and are all lowercase.

    Additional, add a ${excerpt_length} characters excerpt of the article.`
  });
  const { description, tags, blurb } = object;
  if (description && tags && blurb) {
    return cache.setProfile(key, { description, tags, blurb });
  }
  throw ("PROBLEM WITH OPENAI");
}

