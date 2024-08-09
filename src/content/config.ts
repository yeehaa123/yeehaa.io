import { defineCollection, reference, z } from "astro:content";
import * as article from "../../cms/article";
import * as course from "../../cms/course";
import * as profile from "../../cms/profile";
import * as landing from "../../cms/landing";
import * as serie from "../../cms/series";
import * as tag from "../../cms/tag";

const posts = defineCollection({
  type: "content",
  schema: ({ image }) => article.schema.extend({
    bannerImageURL: image(),
    course: reference('Courses').optional(),
    series: reference('Series').optional()
  })
});

const landingPages = defineCollection({
  type: "data",
  schema: ({ image }) => landing.schema.extend({
    profileImageURL: image(),
    bannerImageURL: image(),
    articles: z.array(reference('Posts')),
    courses: z.array(reference('Courses')),
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

const tags = defineCollection({
  type: "data",
  schema: tag.schema.extend({
    articles: z.array(reference('Posts')),
    courses: z.array(reference('Courses')),
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
  Tags: tags,
  Profiles: profiles,
  LandingPage: landingPages,
  Courses: courses,
  Series: series
};
