import type { Curator } from "@/offcourse/types";

import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  InstagramLogoIcon
} from '@radix-ui/react-icons'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CardDescription } from "@/components/ui/card"
import { AvatarImage } from "./";

enum Socials {
  LINKEDIN = "linkedin",
  GITHUB = "github",
  INSTAGRAM = "instagram"
}

export default function Curator({ alias, socials }: Curator) {
  const icons = {
    [Socials.LINKEDIN]: LinkedInLogoIcon,
    [Socials.GITHUB]: GitHubLogoIcon,
    [Socials.INSTAGRAM]: InstagramLogoIcon,
  }
  return (
    <div className="flex align-middle py-4 items-center justify-between">
      <a href={`/offcourse/curator/${alias}`} className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage userName={alias} saturation={100} lightness={100} />
          <AvatarFallback className="bg-indigo-600 text-white">YH</AvatarFallback>
        </Avatar>
        <CardDescription className="capitalize">{alias}</CardDescription>
      </a>

      <div className="flex items-center space-x-3 mx-3">
        {Object.entries(socials).map(([key, value]) => {
          const Comp = icons[key as Socials];
          return value && <Comp key={key} href={value} className="h-6 w-6" />
        }
        )}
      </div>
    </div>
  )
}
