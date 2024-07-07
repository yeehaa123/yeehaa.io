import 'dotenv/config'
import { createOpenAI } from '@ai-sdk/openai';
import * as cache from '../cache';
import { generateObject } from 'ai';
import { ZodSchema } from 'zod';

const vercel = createOpenAI({ apiKey: process.env.OPENAI_API_KEY || "FAKE_KEY" });


export async function analyze({ prompt, id, schema }: { prompt: string, id: string, schema: ZodSchema }) {
  const cachedItem = await cache.getItem(id);
  if (cachedItem) { return schema.parse(cachedItem); }
  const { object } = await generateObject({
    model: vercel('gpt-4o'),
    schema: schema,
    prompt
  })
  const item = schema.parse(object);
  cache.setItem(id, item);
  return item;
}

