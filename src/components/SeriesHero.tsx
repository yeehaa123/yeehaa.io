import type { ReactElement } from "react"

type Props = {
  title: string,
  summary: string,
  children?: ReactElement
}


export function SeriesHero({ children, title, summary }: Props) {
  return <div className="flex flex-col gap-x-8 w-full lg:w-11/12 xl:w-9/12 2xl:w-8/12 mx-auto items-center mt-32">
    {children}
    <div className="px-8 flex flex-col justify-center gap-y-5 py-8 md:py-12 max-w-4xl text-center">
      <h1 className="font-sans hover:font-serif md:text-5xl text-black dark:text-white text-4xl underline decoration-secondary">
        {title}
      </h1>
      <p className="font-serif text-black dark:text-white">{summary}</p>
    </div>
  </div>
}
