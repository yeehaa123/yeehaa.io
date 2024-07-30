import type { CTA } from "./CTA"
import { CallToAction } from "./CTA";


type Props = {
  title: string,
  subtitle: string,
  cta: CTA
}

export function HeroSection({ title, subtitle, cta }: Props) {
  return (
    <header className="relative h-4/6 pt-36 xl:pt-48 flex items-center justify-center bg-cover bg-center">
      <div className="absolute inset-0 bg-primary opacity-100"></div>
      <div className="relative z-10 text-center text-black px-4">
        <h1 className="text-6xl font-extrabold mb-6">{title}</h1>
        <p className="text-2xl mb-10 max-w-2xl mx-auto">{subtitle}</p>
        <CallToAction {...cta} />
      </div>
    </header>
  )
}
