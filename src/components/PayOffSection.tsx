import { PageSection, Step } from "@/components";

type Item = {
  title: string,
  icon: string,
  description: string,
}

type Props = {
  items: Item[]
}

export function PayOffSection({ items }: Props) {
  return (
    <PageSection.Container
      className="pt-16 mb-16 bg-white dark:bg-black grid items-center justify-center text-center">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:flex md:justify-between">
        {items.map((item, index) => <Step key={index} {...item} step={index} />)}
      </div>
    </PageSection.Container>
  )
}
