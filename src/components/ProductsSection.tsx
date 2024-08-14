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
  items: FeatureCardProps[],
  cta: CTA,
}

export function ProductsSection({ title, subtitle, description, items, cta }: Props) {
  return (
    <PageSection.Root>
      <PageSection.Container
        className="flex flex-col justify-center items-center gap-y-12 lg:gap-16 lg:text-center">
        <div>
          <PageSection.Header>{title}</PageSection.Header>
          <PageSection.SubHeader >{subtitle}</PageSection.SubHeader>
          <PageSection.Description >{description}</PageSection.Description>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 w-full">
          {items.map((product, index) => <FeatureCard key={index} className="border-none bg-offwhite dark:bg-offblack" iconSize="LARGE" {...product} />)}
        </div>
        <div className="text-center mt-12">
          <CallToAction {...cta} />
        </div>
      </PageSection.Container>
    </PageSection.Root>
  )
}
