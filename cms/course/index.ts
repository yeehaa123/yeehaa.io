import { generateChecksum } from "../helpers";
import { parse } from "yaml";

export async function init({ content }: { content: string }) {
  const checksum = generateChecksum(content);
  const course = await parse(content);
  const frontmatter = {
    checksum,
    title: course.goal
  }
  return { frontmatter, course };
}
