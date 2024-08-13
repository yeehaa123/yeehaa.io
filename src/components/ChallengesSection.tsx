import {
  IconCard,
  PageSection
} from "@/components";

type Item = {
  title: string,
  icon: string,
  description: string,
}

type Props = {
  title: string,
  description: string,
  subtitle: string,
  items: Item[]
}

export function ChallengesSection({ title, description, items }: Props) {
  return (
    <PageSection.Root>
      <PageSection.Container
        className="grid items-center justify-center gap-8 lg:text-left lg:grid-cols-2">
        <div>
          <PageSection.Header>{title}</PageSection.Header>
          <PageSection.Description>{description}</PageSection.Description>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, index) => <IconCard key={index} className="bg-offwhite dark:bg-offblack border-none" {...item} />)}
        </div>
      </PageSection.Container>
    </PageSection.Root>
  )
}
