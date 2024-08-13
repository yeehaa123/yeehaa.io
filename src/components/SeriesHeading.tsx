import voca from "voca";
type Props = {
  order: number | undefined,
  series?: {
    id: string
  } | undefined
}

export function deslugify(slug: string) {
  return voca
    .chain(slug)
    .replaceAll("-", " ")
    .titleCase()
    .value();
}
export function SeriesHeading({ series, order = 1 }: Props) {
  const formattedOrder = ('00' + order).slice(-3);
  if (!series) return;
  return (
    <a href={`/series/${series.id}`}>
      <h2 className="flex mb-1 md:mb-2 gap-2 text-xl md:text-3xl">
        <span className="text-secondary font-extrabold font-black">
          {formattedOrder}
        </span>
        <span className="text-secondary-light font-normal font-sans">
          {deslugify(series.id)}
        </span>
      </h2>
    </a>
  )
}
