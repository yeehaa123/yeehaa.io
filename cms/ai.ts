import * as cache from './cache';

import { createOpenAI } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import 'dotenv/config'

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function analyze(content: string) {
  const { object } = await generateObject({
    model: openai('gpt-4o'),
    schema: z.object({
      summary: z.string(),
      tags: z.array(z.string())
    }),
    prompt: `Please summarize the following article for me: ${content}`
  });
  return object;
}

export async function augment({ checksum, content }: { checksum: string, content: string }) {
  const cachedItem = await cache.get(checksum);
  if (cachedItem) {
    return cachedItem;
  }
  const { summary, tags } = await analyze(content);
  if (summary && tags) {
    await cache.set(checksum, { summary, tags });
    return { summary, tags }
  }
  throw ("PROBLEM WITH OPENAI");
}
