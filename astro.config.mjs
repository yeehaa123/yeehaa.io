import {defineConfig} from 'astro/config';
import {visit} from 'unist-util-visit';
import section from '@hbsnow/rehype-sectionize';
import classNames from 'rehype-class-names';
import slug from 'rehype-slug';
import unwrapImages from 'remark-unwrap-images';
import remarkGfm from 'remark-gfm';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
	experimental: {},
	markdown: {
		remarkPlugins: [unwrapImages, remarkGfm],
		rehypePlugins: [[classNames, {'h1 + p': 'lead'}], slug, section],
	},
	integrations: [tailwind(), mdx(), alpinejs()],
});
