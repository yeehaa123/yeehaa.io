import { defineConfig } from 'astro/config';
import { visit } from 'unist-util-visit';
import section from '@hbsnow/rehype-sectionize';
import classNames from 'rehype-class-names';
import slug from 'rehype-slug';
import unwrapImages from 'remark-unwrap-images';
import remarkGfm from 'remark-gfm';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import alpinejs from '@astrojs/alpinejs';
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  experimental: {},
  site: 'https://yeehaa.io',
  markdown: {
    remarkPlugins: [unwrapImages, remarkGfm],
    rehypePlugins: [[classNames, {
      'h1 + p': 'lead'
    }], slug, section]
  },
  integrations: [tailwind({
    applyBaseStyles: false
  }), mdx(), alpinejs(), react(), sitemap()],
  output: "hybrid",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    }
  })
});
