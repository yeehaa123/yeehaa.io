import rss from '@astrojs/rss';
import { getPosts } from "@/helpers/pages";
import { getEntry } from "astro:content";
import type { AstroUserConfig } from 'astro/config';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();


export async function GET(context: AstroUserConfig) {
  const title = "YEEHAA";
  const posts = await getPosts();
  const profile = await getEntry("Profiles", "yeehaa");
  const description = profile.data.description

  return rss({
    title,
    description,
    site: context.site || "something",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      author: post.data.author,
      categories: post.data.series && [post.data.series.id],
      description: post.data.description,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      }),
      link: `/posts/${post.slug}/`,
    }))
  });
}
