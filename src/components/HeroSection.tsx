import type { CTA } from "./CTA";
import {
  CallToAction,
  PageSection
} from "@/components";

type Props = {
  title: string,
  subtitle: string,
  cta: CTA
}

export function HeroSection({ title, subtitle, cta }: Props) {
  return (
    <PageSection.Container
      className="max-w-xl items-center text-black justify-center text-center pb-8">
      <h1 className="text-6xl font-extrabold mb-6">{title}</h1>
      <p className="text-xl md:text-2xl mb-10">{subtitle}</p>
      <CallToAction {...cta} />
    </PageSection.Container>
  )
}
