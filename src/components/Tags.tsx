import { badgeVariants } from "@/components/ui/badge"
import { cn } from "@/lib/utils"


export function Tags({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1">
    {tags.map(tag => <a
      href={`/tags/${tag}`}
      className={cn(
        badgeVariants({ variant: "outline" }),
        "rounded-none text-black font-normal hover:bg-black hover:text-white")}
      key={tag}>
      {tag}
    </a>)}
  </div>
}
