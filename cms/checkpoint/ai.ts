import type { BaseCheckpoint } from "./schema";
import * as ai from "../ai"
import * as cs from "../course/schema"

export async function analyzeCheckpoint({ href, task, goal, checkpointId }: BaseCheckpoint) {
  const num_chars = 400;
  const min_num_tags = 1;
  const max_num_tags = 4;
  const tag_length = 7;
  const id = checkpointId;
  const schema = cs.analysisSchema.pick({ description: true, tags: true });
  const prompt = `You are a helpful coach that tries to help the user to reach the following goal: ${goal} and you are provided with the following task: ${task}.
  
Can you provide a description that explain how the following link '${href}' helps people to achieve the mentioned goal and required task in no more than ${num_chars} character without including a suggestion to read the article or a link? Also, just give the summary no reference to the question needed.

While keeping the specific goal and task in mind, can you give me a minimum of ${min_num_tags} and a maximum of ${max_num_tags} single-word, simple, non-hyphenated tags for this href? Only include tags that are really important. Again, only give me the answer. No extra words. Tags can have no more than ${tag_length} characters, are not composed of multiple words and can thus not contain a hyphen, and are all lowercase. 
`
  return ai.text.analyze({ prompt, schema, id });
}
