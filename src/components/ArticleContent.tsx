import { cx } from "class-variance-authority"
import type { ReactElement } from "react"

type Props = {
  children: ReactElement,
  className?: string
}

export function ArticleContent({ children, className }: Props) {
  return <div className={cx(`prose prose-base md:prose-lg lg:prose-xl
        prose-lead:font-serif prose-lead:text-black dark:prose-lead:text-white
        prose-lead:first-letter:text-3xl
        prose-lead:md:first-letter:text-4xl
        prose-lead:lg:first-letter:text-5xl
        prose-lead:prose-lg md:prose-lead:prose-xl lg:prose-lead:prose-2xl
        dark:prose-invert
        prose-h1:font-serif hover:prose-h1:font-sans
        prose-h2:font-serif hover:prose-h2:font-sans
        md:prose-h1:text-6xl prose-h1:text-4xl
        md:prose-h2:text-3xl prose-h2:text-xl
        prose-strong:font-serif
        prose-strong:text-secondary
        prose-blockquote:font-serif prose-blockquote:font-normal prose-blockquote:not-italic
        prose-blockquote:border-secondary-light
        prose-a:no-underline prose-a:text-secondary-dark dark:prose-a:text-secondary-light hover:prose-a:text-secondary-light`, className)} >
    {children}
  </div>
}
