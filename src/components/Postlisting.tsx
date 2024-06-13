import type { ArticleFrontmatter } from "cms/article/frontmatter";
import { SeriesHeading } from "./SeriesHeading";
import { Tags } from "@/components/Tags";

type Props = Pick<ArticleFrontmatter,
  'series'
  | 'order'
  | 'title'
  | 'summary'
  | 'tags'
  | 'slug'>

export function PostListing({ series, order, title, summary, tags, slug }: Props) {
  return (
    <div className="flex flex-col mt-14 mb-32">
      <SeriesHeading href="/" order={order} series={series} />
      <a href={`/posts/${slug}`}>
        <h1 className="font-serif font-black hover:font-sans md:text-6xl text-4xl mb-2 md:mb-8">
          {title}
        </h1>
      </a>
      <Tags tags={tags} />
      <p className="my-8 text-md lg:text-xl leading-loose lg:leading-loose">
        {summary}
      </p>
    </div>
  )
}
