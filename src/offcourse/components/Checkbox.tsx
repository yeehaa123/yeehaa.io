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
    id={id}
    className={cn(
      "bg-gray-50 dark:bg-gray-950 h-5 w-5 border-none rounded-none",
      className, { "invisible": disabled, "bg-gray-800": checked })
    }
    checked={checked}
    onClick={onClick} />
}
