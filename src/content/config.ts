import { defineCollection } from "astro:content";
import * as fm from "../../cms/frontmatter";


const postsCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: ({ image }) => fm.schema.extend({
    imageURL: image()
  })
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  Posts: postsCollection,
};
