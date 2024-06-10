import * as cache from './cache';

import OpenAI from "openai";

import { createOpenAI } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import 'dotenv/config'

const vercel = createOpenAI({ apiKey: process.env.OPENAI_API_KEY || "FAKE_KEY" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function analyze({ content, title }: { content: string, title: string }) {
  const summary_length = 600;
  const excerpt_length = 200;
  const min_num_tags = 3;
  const max_num_tags = 5;
  const tag_length = 7;
  const { object } = await generateObject({
    model: vercel('gpt-4o'),
    schema: z.object({
      summary: z.string(),
      excerpt: z.string(),
      tags: z.array(z.string())
    }),
    prompt: `Please summarize the following article with the title '${title}' in a maximum of ${summary_length} characters for me: 

${content}


Also add ${min_num_tags} to ${max_num_tags} tags. A single tags is a single-word, simple, non-hyphenated and are associated to a href? Only include tags that are really important. Again, only give me the answer. No extra words. Tags can have no more than ${tag_length} characters, are not composed of multiple words and can thus not contain a hyphen, and are all lowercase.

    Finally, add a ${excerpt_length} characters excerpt of the article.`
  });
  return object;
}

async function generateImage({ summary, title, checksum }: { summary: string, title: string, checksum: string }) {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `generate a banner image that matches the blog post with the following title '${title}' and summary: ${summary}`,
    n: 1,
    response_format: "b64_json",
    size: "1792x1024",
  });
  const b64_json = response?.data[0]?.b64_json;
  if (b64_json) {
    return cache.writeImage({ checksum, b64_json });
  }
  return false;
}

export async function augment({ checksum, title, content }:
  { checksum: string, title: string, content: string }) {
  const cachedItem = await cache.get(checksum);
  if (cachedItem) {
    return cachedItem;
  }
  const { summary, tags, excerpt } = await analyze({ title, content });

  const imageURL = await generateImage({ title, summary, checksum });

  if (summary && tags && excerpt && imageURL) {
    await cache.set(checksum, { summary, tags, excerpt, imageURL });
    return { summary, tags, excerpt, imageURL }
  }
  throw ("PROBLEM WITH OPENAI");
}
