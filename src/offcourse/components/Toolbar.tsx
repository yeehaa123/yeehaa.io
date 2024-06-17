import { cn } from "@/lib/utils"
import type { Habitat } from "../types"
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
    <div className="flex w-full justify-end">
      <div className="flex gap-x-4 ">
        {habitat && <a href={`/posts/${habitat.slug}`} className={cn("invisible", { "visible": habitat })}>
          <Crosshair1Icon className="h-4 w-4 text-gray-500" />
        </a>}
      </div>
    </div>
  )
}
