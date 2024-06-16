import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode,
}


export default forwardRef<HTMLDivElement, Props>(function({ children }, ref) {
  return (
    <Card ref={ref} className={cn("flex flex-col select-none")}>
      {children}
    </Card >)
})
