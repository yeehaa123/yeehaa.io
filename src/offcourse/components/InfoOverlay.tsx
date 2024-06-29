import { Button } from "@/components/ui/button"
import {
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"

export function InfoOverlay(
  { courseId, actions }: any) {
  const { hideOverlay } = actions;
  return (
    <>
      <CardHeader className="flex flex-row gap-x-7 space-y-0 items-top">
        <CardTitle>TBD</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 grow flex flex-col justify-center">
        <CardDescription>TBD</CardDescription>
      </CardContent >
      <CardFooter className="flex w-full justify-between gap-x-2">
        <Button onClick={() => {
          hideOverlay({ courseId })
        }} className="w-full">Close</Button>
      </CardFooter>
    </>
  )
}
