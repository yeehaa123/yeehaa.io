import { defineCollection } from "astro:content";
import * as article from "../../cms/article";
import * as course from "../../cms/course";

const postsCollection = defineCollection({
  type: "content",
  schema: ({ image }) => article.schema.extend({
    imageURL: image()
  })
});

const coursesCollection = defineCollection({
  type: "data",
  schema: course.schema
});

export const collections = {
  Posts: postsCollection,
  Courses: coursesCollection
};
