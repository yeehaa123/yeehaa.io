import type { ArticleFrontmatter } from "cms/article/frontmatter";
import { ArticleHeading } from "./ArticleHeading";
import { Tags } from "@/components/Tags";

type Props = Pick<ArticleFrontmatter,
  'series'
  | 'order'
  | 'title'
  | 'summary'
  | 'tags'> & { slug: string }

export function PostListing({ series, order, title, summary, tags, slug }: Props) {
  return (
    <div className="flex flex-col mt-14 mb-32">
      <ArticleHeading
        className="mb-2 md:mb-8
        " href="/" order={order} series={series} slug={slug} title={title} />
      <Tags tags={tags} />
      <p className="my-8 text-md lg:text-xl leading-loose lg:leading-loose">
        {summary}
      </p>
    </div>
  )
}
