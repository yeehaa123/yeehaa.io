import { cn } from "@/lib/utils"
import type { Habitat } from "../types"
import { Logo } from "./Logo";
import {
  Crosshair1Icon,
} from '@radix-ui/react-icons'

type Props = {
  className?: string,
  habitat?: Habitat | undefined
  showInfoOverlay: () => void
}

export default function Toolbar({
  className,
  showInfoOverlay,
  habitat,
}: Props) {
  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-start gap-x-4 ">
        <Logo onClick={showInfoOverlay}
          className={cn("h-4 w-4 fill-gray-500 hover:fill-secondary", className, { "hidden": false })} />
      </div>
      <div className="flex gap-x-4 ">
        {habitat && <a href={`/posts/${habitat.slug}`} className={cn("invisible", { "visible": habitat })}>
          <Crosshair1Icon className="h-4 w-4 text-gray-500 hover:text-secondary" />
        </a>}
      </div>
    </div>
  )
}
