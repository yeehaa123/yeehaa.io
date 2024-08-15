import type { CTA } from "./CTA";
import {
  CallToAction,
  PageSection
} from "@/components";

type Props = {
  title: string,
  subtitle: string,
  description: string,
  cta: CTA
}

export function HeroSection({ title, subtitle, cta, description }: Props) {
  return (
    <PageSection.Container
      className="text-black pb-16">
      <div className="flex flex-col max-w-5xl gap-12 text-center md:text-left">
        <div className="flex flex-col-reverse md:flex-col gap-2">
          <p className="text-xl md:text-2xl font-serif text-offblack">{subtitle}</p>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold">{title}</h1>
        </div>
        <p className="max-w-lg lg:max-w-2xl md:text-lg md:text-xl">{description}</p>
        <div className="flex justify-center md:justify-start">
          <CallToAction {...cta} />
        </div>
      </div>
    </PageSection.Container >
  )
}
