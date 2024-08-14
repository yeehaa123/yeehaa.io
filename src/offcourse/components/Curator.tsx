import type { Curator } from "@/offcourse/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CardDescription } from "@/components/ui/card"
import { Socials } from "./Socials";
import { AvatarImage } from "./";

export default function Curator({ alias, socials }: Curator) {
  return (
    <div className="flex align-middle py-4 items-center justify-between">
      <a href={`/about`} className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage userName={alias} saturation={100} lightness={100} />
          <AvatarFallback className="bg-secondary text-white">YH</AvatarFallback>
        </Avatar>
        <CardDescription className="capitalize">{alias}</CardDescription>
      </a>
      <Socials socials={socials} />
    </div>
  )
}
