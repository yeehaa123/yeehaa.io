import type { Curator } from "@/offcourse/types";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  InstagramLogoIcon
} from '@radix-ui/react-icons'

enum SocialProviders {
  LINKEDIN = "linkedin",
  GITHUB = "github",
  INSTAGRAM = "instagram"
}
export function Socials({ socials }: { socials: Curator['socials'] }) {
  const icons = {
    [SocialProviders.LINKEDIN]: LinkedInLogoIcon,
    [SocialProviders.GITHUB]: GitHubLogoIcon,
    [SocialProviders.INSTAGRAM]: InstagramLogoIcon,
  }
  return <div className="flex items-center space-x-3 mx-3">
    {Object.entries(socials).map(([key, value]) => {
      const Comp = icons[key as SocialProviders];
      return value && <a key={key} href={value}><Comp className="h-6 w-6 hover:text-secondary" /></a>
    })}
  </div>
}
