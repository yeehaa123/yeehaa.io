import 'dotenv/config'
import * as cache from '../cache';
import { generateObject } from 'ai';
import { ZodSchema } from 'zod';

import { anthropic } from '@ai-sdk/anthropic';

export async function analyze({ prompt, id, schema }: { prompt: string, id: string, schema: ZodSchema }) {
  const cachedItem = await cache.getItem(id);
  if (cachedItem) {
    console.log("FROM CACHE", id);
    return schema.parse(cachedItem);
  }
  console.log("NOT FROM CACHE", id);
  try {
    const { object } = await generateObject({
      // @ts-ignore
      model: anthropic('claude-3-5-sonnet-20240620'),
      schema: schema,
      prompt
    })
    const item = schema.parse(object);
    cache.setItem(id, item);
    return item;
  } catch (e) {
    console.log("ERROR:", e);
  }
}

