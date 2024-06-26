import { SeriesHeading } from "@/components/SeriesHeading";

type Series = {
  id: string;
}

type Props = {
  className?: string | undefined;
  order?: number | undefined;
  series?: Series | undefined;
  title: string;
  href: string;
  slug?: string
}

export function ArticleHeading({ className, href, slug, order, series, title }: Props) {
  return (
    <div className={className}>
      {series && <SeriesHeading href={href} order={order} series={series} />}
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
