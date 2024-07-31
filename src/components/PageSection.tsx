import type { ReactElement } from "react";

type Section = {
  title: string,
  subtitle?: string,
  children: ReactElement,
  className?: string
}

export const Section = ({ title, subtitle, children, className = '' }: Section) => (
  <section className={`py-16 ${className}`}>
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-xl mb-8">{subtitle}</p>}
      {children}
    </div>
  </section>
);
