type Props = {
  href: string,
  order: number | undefined,
  series: string | undefined
}

export function SeriesHeading({ series, order, href }: Props) {
  const formattedOrder = ('00' + order).slice(-3);
  if (!series) return;
  return (
    <a href={href}>
      <h2 className="flex mb-1 md:mb-2 gap-2 text-xl md:text-3xl">
        <span className="text-secondary font-extrabold font-black">
          {formattedOrder}
        </span>
        <span className="text-secondary-light font-normal font-sans">
          {series}
        </span>
      </h2>
    </a>
  )
}
