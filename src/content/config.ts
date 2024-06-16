import { defineCollection, reference } from "astro:content";
import * as article from "../../cms/article";
import * as course from "../../cms/course";

const posts = defineCollection({
  type: "content",
  schema: ({ image }) => article.schema.extend({
    imageURL: image(),
    course: reference('Courses').optional()
  })
});

const courses = defineCollection({
  type: "data",
  schema: course.schema.extend({
    habitat: reference('Posts').optional()
  })
});

export const collections = {
  Posts: posts,
  Courses: courses
};
