import { defineCollection, reference, z } from "astro:content";
import * as article from "../../cms/article";
import * as course from "../../cms/course";
import * as profile from "../../cms/profile";
import * as serie from "../../cms/series";

const posts = defineCollection({
  type: "content",
  schema: ({ image }) => article.schema.extend({
    bannerImageURL: image(),
    course: reference('Courses').optional(),
    series: reference('Series').optional()
  })
});

const profiles = defineCollection({
  type: "data",
  schema: ({ image }) => profile.schema.extend({
    profileImageURL: image(),
    articles: z.array(reference('Posts')),
  })
});

const series = defineCollection({
  type: "data",
  schema: ({ image }) => serie.schema.extend({
    bannerImageURL: image(),
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
  Courses: courses,
  Series: series
};
