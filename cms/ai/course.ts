import 'dotenv/config'
import { createHash } from 'crypto';
import * as cache from '../cache';
import type { Checkpoint } from "../course/checkpoint";
import { createOpenAI } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

const vercel = createOpenAI({ apiKey: process.env.OPENAI_API_KEY || "FAKE_KEY" });

export async function analyze({ goal, checkpoints, id }: { goal: string, checkpoints: Checkpoint[], id: string }) {
  const num_chars = 400;
  let hash = createHash('md5').update(id).digest("hex")
  const key = `CO-${hash}`
  const cachedItem = await cache.getCourse(key);
  if (cachedItem) { return cachedItem; }
  const { object } = await generateObject({
    model: vercel('gpt-4o'),
    schema: z.object({
      description: z.string(),
    }),
    prompt: `You are a helpful coach that tries to help the user to reach the following goal: ${goal} and you are provided with the following sequence of checkpoints: ${JSON.stringify(checkpoints, null, 2)}
  
Can you provide a description that explain how the provided checkpoints help people to achieve the mentioned goal in no more than ${num_chars} characters without including a suggestions to read the articles or links? Also, just give the summary no reference to the question needed.

Also, do not mention the word 'checkpoint' explicitly.
`
  });
  if (object) {
    return cache.setCourse(key, object);
  }
  throw ("PROBLEM WITH OPENAI");
}

