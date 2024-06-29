import { cn } from "@/lib/utils"
import type { Habitat } from "../types"
import { Logo } from "./Logo";
import {
  Crosshair1Icon,
} from '@radix-ui/react-icons'

type Props = {
  habitat?: Habitat | undefined
}

export default function Toolbar({
  habitat,
}: Props) {
  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-start gap-x-4 ">
        <Logo onClick={console.log}
          className={cn("h-4 w-4 fill-gray-500 hover:fill-secondary", { "hidden": false })} />
      </div>
      <div className="flex gap-x-4 ">
        {habitat && <a href={`/posts/${habitat.slug}`} className={cn("invisible", { "visible": habitat })}>
          <Crosshair1Icon className="h-4 w-4 text-gray-500 hover:text-secondary" />
        </a>}
      </div>
    </div>
  )
}
