import type { ReactElement } from "react";

type Section = {
  className?: string,
  children: ReactElement | ReactElement[]
}

export function PageSection({ children, className = '' }: Section) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-8 md:px-16">
        {children}
      </div>
    </section>
  )
}
