import type { PingItemProps } from "./PingItem"
import {
  PageSection,
  PingItem
} from "@/components";


type Props = {
  title: string,
  items: PingItemProps[]
}

export function ConceptsSection({ title, items }: Props) {
  return (
    <PageSection.Root className="overflow-x-clip">
      <PageSection.Container className="grid items-center justify-center gap-4 text-center lg:gap-16">
        <PageSection.Header>{title}</PageSection.Header>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:gap-24">
          {items.map((item, index) => <PingItem key={index} {...item} />)}
        </div>
      </PageSection.Container>
    </PageSection.Root>
  )
}
