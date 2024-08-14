import {
  CallToAction,
  PageSection,
} from "@/components";
import type { CTA } from "./CTA";


type Props = {
  title: string,
  subtitle: string,
  cta: CTA
}

export function CTASection({ title, subtitle, cta }: Props) {
  return (
    <PageSection.Root>
      <PageSection.Container className="text-center">
        <PageSection.Header>{title}</PageSection.Header>
        <PageSection.SubHeader >{subtitle}</PageSection.SubHeader>
        <CallToAction {...cta} />
      </PageSection.Container>
    </PageSection.Root>
  )
}
