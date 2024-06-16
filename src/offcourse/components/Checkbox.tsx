import { Checkbox as CB } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

type Props = {
  id: string,
  disabled: boolean,
  checked: boolean,
  onClick: () => void;
  className?: string
}

export default function Checkbox({ id, checked, disabled, onClick, className }: Props) {
  return <CB
    className={cn("bg-gray-50", className, { "invisible": disabled, "bg-gray-800": checked })}
    id={id}
    checked={checked}
    onClick={onClick} />
}
