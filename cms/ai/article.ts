import 'dotenv/config'
import { createOpenAI } from '@ai-sdk/openai';
import * as cache from '../cache';
import { generateObject } from 'ai';
import { z } from 'zod';

const vercel = createOpenAI({ apiKey: process.env.OPENAI_API_KEY || "FAKE_KEY" });

export async function analyze({ checksum, content, title }: { checksum: string, content: string, title: string }) {
  const cachedItem = await cache.getArticle(checksum);
  if (cachedItem) { return cachedItem; }
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

    Additional, add a ${excerpt_length} characters excerpt of the article.`
  });
  const { summary, tags, excerpt } = object;
  if (summary && tags && excerpt) {
    return cache.setArticle(checksum, { summary, tags, excerpt });
  }
  throw ("PROBLEM WITH OPENAI");
}

