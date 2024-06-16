import { cn } from "@/lib/utils";

type Props = {
  className: string,
  onClick: () => void
}

export default function Logo({ className, onClick }: Props) {
  return <svg className={cn("w-4 h-4", className)} onClick={onClick} viewBox="0 0 180 180">
    <path d="M0,0v180h180V0H0z M150,150H30v-30h120V150z" />
  </svg>
}
