import { cx } from "class-variance-authority"
import type { ReactElement } from "react";

type Props = {
  children: ReactElement | ReactElement[],
  className?: string
}

export function NarrowSection({ children, className }: Props) {
  return <section className={cx("w-full py-12 md:py-24 lg:py-32 lg:w-11/12 xl:w-9/12 2xl:w-8/12 mx-auto", className)}>
    {children}
  </section>
}
