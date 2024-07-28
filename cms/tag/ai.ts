import * as ts from "./schema"
import * as ai from "../ai";
import type { AssociatedTag } from "./schema";

export async function analyze(entity: AssociatedTag, id: string) {
  const { meta, associations } = entity;
  const { title } = meta;
  const { articles, courses } = associations;;
  const summary_length = 600;
  const excerpt_length = 200;
  const schema = ts.augmentationsSchema.omit({
    checksum: true,
  });
  const prompt = `
Given the following things:
- this is the overview page for a tag with the following title ${title}
- and the following summary of the resources it refer to:

Articles: ${JSON.stringify(articles, null, 2)}

Courses: ${JSON.stringify(courses, null, 2)}

Please describe the tag a maximum of ${summary_length} characters. Dont use quotation marks. Also do not explictly mention the word 'tag'.
n
Additionally, add a ${excerpt_length} characters excerpt of the article.`
  return await ai.text.analyze({ prompt, schema, id })
}
