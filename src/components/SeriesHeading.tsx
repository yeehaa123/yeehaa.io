type Props = {
  href: string,
  order: number | undefined,
  series: string | undefined
}

export function SeriesHeading({ series, order, href }: Props) {
  const formattedOrder = ('00' + order).slice(-3);
  return series && <a href={href}>
    <h2 className="flex mb-1 md:mb-2 gap-2">
      <span className="text-secondary font-extrabold">{formattedOrder}</span>
      <span className="text-secondary-light">{series}</span>
    </h2>
  </a>
}
