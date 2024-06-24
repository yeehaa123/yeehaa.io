import type { InitCheckpoint, BaseCheckpoint } from './schema';
import { checkpointSchema, baseCheckpointSchema } from './schema';
import { hashify } from "../helpers";
import * as ai from "./ai";


export function init({ task, href, goal, curator }: InitCheckpoint) {
  let checkpointId = hashify(JSON.stringify({ href, task, goal, curator }));
  return baseCheckpointSchema.parse({ task, href, curator, checkpointId, goal })
}

export async function analyze(checkpoint: BaseCheckpoint) {
  const { description, tags } = await ai.analyzeCheckpoint(checkpoint);
  return checkpointSchema.parse({ ...checkpoint, description, tags })
}
