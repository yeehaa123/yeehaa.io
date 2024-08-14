import type { CTA } from "./CTA";
import {
  PageSection,
  CallToAction,
  FeatureCard
} from "@/components";
import type { FeatureCardProps } from "./FeatureCard";


type Props = {
  title: string,
  description: string,
  subtitle: string,
  cta: CTA,
  items: FeatureCardProps[]
}

export function ServicesSection({ title, subtitle, description, items, cta }: Props) {
  return (
    <PageSection.Root>
      <PageSection.Container className="flex flex-col justify-center items-center gap-y-12 md:text-center">
        <div>
          <PageSection.Header>{title}</PageSection.Header>
          <PageSection.SubHeader >{subtitle}</PageSection.SubHeader>
          <PageSection.Description >{description}</PageSection.Description>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 @container w-full">
          {items.map((service, index) => <FeatureCard key={index} {...service} />)}
        </div>
        <div className="hidden text-center mt-12">
          <CallToAction {...cta} />
        </div>
      </PageSection.Container>
    </PageSection.Root>
  )
}
