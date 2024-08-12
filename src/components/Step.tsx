import { Icon } from "@/components/Icon";
import type { PageSectionItem } from "./PageSection";

type Props = PageSectionItem & {
  step: number
}

export function Step({ title, icon, step }: Props) {
  const numbers = ["One", "Two", "Three"];
  return (
    <div className="flex flex-row flex-2 items-center gap-6">
      <Icon className="h-10 w-10" name={icon} />
      <h3 className="font-serif xl:text-lg text-left w-full">
        <p className="font-bold">Step {numbers[step]}</p>
        <p>{title}</p></h3>
    </div>)
}
