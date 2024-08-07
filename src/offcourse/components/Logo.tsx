import { cn } from "@/lib/utils";

type Props = {
  className: string,
  onClick?: () => void
}

export function Logo({ className, onClick }: Props) {
  return <svg className={cn("w-4 h-4 bg-white", className)}
    onClick={onClick || console.log} viewBox="0 0 180 180">
    <path d="M0,0v181h181V0H0z M150,150H30v-30h120V150z" />
  </svg>
}
