import * as cache from './cache';

import { createOpenAI } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import 'dotenv/config'

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function analyze(content: string) {
  const summary_length = 600;
  const excerpt_length = 200;
  const min_num_tags = 3;
  const max_num_tags = 5;
  const tag_length = 7;
  const { object } = await generateObject({
    model: openai('gpt-4o'),
    schema: z.object({
      summary: z.string(),
      excerpt: z.string(),
      tags: z.array(z.string())
    }),
    prompt: `Please summarize the following article in a maximum of ${summary_length} characters for me: 

${content}


Also add ${min_num_tags} to ${max_num_tags} tags. A single tags is a single-word, simple, non-hyphenated and are associated to a href? Only include tags that are really important. Again, only give me the answer. No extra words. Tags can have no more than ${tag_length} characters, are not composed of multiple words and can thus not contain a hyphen, and are all lowercase.

    Finally, add a ${excerpt_length} characters excerpt of the article.`
  });
  return object;
}

export async function augment({ checksum, content }: { checksum: string, content: string }) {
  const cachedItem = await cache.get(checksum);
  if (cachedItem) {
    return cachedItem;
  }
  const { summary, tags, excerpt } = await analyze(content);
  if (summary && tags && excerpt) {
    await cache.set(checksum, { summary, tags, excerpt });
    return { summary, tags, excerpt }
  }
  throw ("PROBLEM WITH OPENAI");
}
