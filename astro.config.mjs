import { defineConfig } from 'astro/config';
import { visit } from 'unist-util-visit';
import section from '@hbsnow/rehype-sectionize';
import unwrapImages from 'remark-unwrap-images';
import remarkGfm from 'remark-gfm'
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  experimental: {},
  markdown: {
    remarkPlugins: [unwrapImages, remarkGfm],
    rehypePlugins: [section]
  },
  integrations: [tailwind(), mdx(), alpinejs()]
});
