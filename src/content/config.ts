import { defineCollection, reference, z } from "astro:content";
import * as article from "../../cms/article";
import * as course from "../../cms/course";
import * as profile from "../../cms/profile";

const posts = defineCollection({
  type: "content",
  schema: ({ image }) => article.schema.extend({
    bannerImageURL: image(),
    course: reference('Courses').optional()
  })
});

const profiles = defineCollection({
  type: "data",
  schema: ({ image }) => profile.schema.extend({
    profileImageURL: image(),
    articles: z.array(reference('Posts')),
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
  Profiles: profiles,
  Courses: courses
};
