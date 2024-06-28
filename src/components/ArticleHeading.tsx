import { SeriesHeading } from "@/components/SeriesHeading";
import type { ComponentProps } from 'astro/types';

type SeriesHeadingProps = ComponentProps<typeof SeriesHeading>

type Props = {
  className?: string | undefined;
  title: string;
  slug?: string
} & SeriesHeadingProps

export function ArticleHeading({ className, slug, order, series, title }: Props) {
  return (
    <div className={className}>
      {series && <SeriesHeading order={order} series={series} />}
      {slug
        ? <a href={`/posts/${slug}`}>
          <h1 className="font-serif hover:font-sans md:text-6xl text-4xl font-extrabold">
            {title}
          </h1>
        </a>
        : <h1 className="font-serif hover:font-sans md:text-6xl text-4xl font-extrabold">
          {title}
        </h1>}
    </div>
  )
}
