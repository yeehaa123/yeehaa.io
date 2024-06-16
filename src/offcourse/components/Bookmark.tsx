import { cn } from "@/lib/utils"
import { StarIcon, StarFilledIcon } from '@radix-ui/react-icons'

type Props = {
  isBookmarked?: boolean | undefined,
  canBookmark?: boolean | undefined,
  onClick: () => void
}

export default function Bookmark({
  isBookmarked,
  onClick,
  canBookmark,
}: Props) {
  const Icon = isBookmarked
    ? StarFilledIcon
    : StarIcon
  return <Icon onClick={onClick} className={
    cn("h-10 w-10 text-gray-500 invisible", { "visible": canBookmark })} />
}
