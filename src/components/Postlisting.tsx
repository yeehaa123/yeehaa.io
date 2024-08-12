import { ArticleHeading } from "./ArticleHeading";
import { Tags } from "@/components/Tags";
import type { ComponentProps } from 'astro/types';

type TagsProps = ComponentProps<typeof Tags>
type ArticleHeadingProps = ComponentProps<typeof ArticleHeading>

export type PostListingProps = {
  description: string,
  slug: string,
} & TagsProps & ArticleHeadingProps

export function PostListing({ series, order, title, description, tags, slug }: PostListingProps) {
  return (
    <div className="flex flex-col mt-14 mb-32">
      <ArticleHeading
        className="mb-2 md:mb-8" order={order} series={series} slug={slug} title={title} />
      <Tags tags={tags} />
      <p className="my-8 text-md lg:text-xl leading-loose lg:leading-loose">
        {description}
      </p>
    </div>
  )
}
