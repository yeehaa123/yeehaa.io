import { generateChecksum } from "../helpers";
import * as tr from "../table/tableRow";
import { parse } from "yaml";

export async function init({ content }: { content: string }) {
  const checksum = generateChecksum(content);
  const course = await parse(content);
  const frontmatter = tr.init({
    checksum,
    contentType: tr.ContentType.COURSE,
    title: course.goal
  });
  return { frontmatter, course };
}
