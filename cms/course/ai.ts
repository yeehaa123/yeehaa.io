import type { RawCourse } from "./schema";
import * as ai from "../ai"
import * as cs from "./schema"

export async function analyzeCourse({ goal, checkpoints, courseId }: RawCourse) {
  const num_chars = 400;
  const id = courseId
  const schema = cs.analysisSchema.pick({ description: true });
  const prompt = `You are a helpful coach that tries to help the user to reach the following goal: ${goal} and you are provided with the following sequence of checkpoints: ${JSON.stringify(checkpoints, null, 2)}
  
Can you provide a description that explain how the provided checkpoints help people to achieve the mentioned goal in no more than ${num_chars} characters without including a suggestions to read the articles or links? Also, just give the summary no reference to the question needed.

Also, do not mention the word 'checkpoint' explicitly.
`
  return ai.text.analyze({ prompt, schema, id });
}

