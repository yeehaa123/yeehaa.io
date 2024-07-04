import rss from '@astrojs/rss';
import { getPosts } from "@/helpers/pages";
import { getEntry } from "astro:content";
import type { AstroUserConfig } from 'astro/config';

export async function GET(context: AstroUserConfig) {
  const title = "YEEHAA";
  const posts = await getPosts();
  const series = await getEntry("Series", "ecosystem-architecture");
  const description = series.data.summary;

  return rss({
    title,
    description,
    site: context.site || "something",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.summary,
      link: `/posts/${post.slug}/`,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
