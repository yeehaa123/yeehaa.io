import type { FAQItem } from "./FAQ";
import {
  PageSection,
  FAQ
} from "@/components";

type Props = {
  title: string,
  items: FAQItem[]
}

export function FAQSection({ title, items }: Props) {
  return (
    <PageSection.Root className="bg-primary text-black">
      <PageSection.Container className="flex flex-col gap-8" >
        <PageSection.Header>{title}</PageSection.Header>
        <FAQ items={items} />
      </PageSection.Container>
    </PageSection.Root>
  )
}
