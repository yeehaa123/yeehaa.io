import type { IconCardProps } from "./IconCard";
import {
  PageSection,
  IconCard
} from "@/components";


type Props = {
  title: string,
  description: string,
  subtitle: string,
  items: IconCardProps[]
}

export function ApproachSection({ title, subtitle, description, items }: Props) {
  return (
    <PageSection.Root>
      <PageSection.Container className="grid items-center justify-center lg:text-left gap-x-16 lg:grid-cols-2">
        <div className="py-8 lg:order-last">
          <PageSection.Header>{title}</PageSection.Header>
          <PageSection.SubHeader >{subtitle}</PageSection.SubHeader>
          <PageSection.Description>{description}</PageSection.Description>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {items.map((item, index) => <IconCard key={index} {...item} />)}
        </div>
      </PageSection.Container>
    </PageSection.Root>
  )
}
