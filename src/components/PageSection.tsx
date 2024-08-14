import { cx } from "class-variance-authority"
import type { ReactNode } from "react"

type PageSectionProps = {
  className?: string
  children: ReactNode
}

export function Root({ className, children }: PageSectionProps) {
  return <section className={cx("py-24 md:py-36 lg:py-48", className)}>
    {children}
  </section>
}

export function Container({ className, children }: PageSectionProps) {
  return <section className={cx("container mx-auto px-8 md:px-16", className)}>
    {children}
  </section>
}

export function Header({ className, children }: PageSectionProps) {
  return (
    <h2 className={cx("text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-2", className)}>
      {children}
    </h2>
  )
}

export function SubHeader({ className, children }: PageSectionProps) {
  return (
    <p className={cx("text-xl text-gray-500 dark:text-gray-400 mb-8", className)}>
      {children}
    </p>
  )
}

export function Description({ className, children }: PageSectionProps) {
  return (
    <p className={cx(
      "max-w-5xl md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed",
      className
    )}>
      {children}
    </p>
  )
}
