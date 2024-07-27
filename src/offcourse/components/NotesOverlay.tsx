import { Button } from "@/components/ui/button"
import {
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import type { OverlayProps } from "./Overlay";

export function NotesOverlay(
  { courseId, actions, cardState }: OverlayProps) {
  const { overlayMode, notes } = cardState;
  const { hideOverlay } = actions;
  notes.map(({ annotatedAt }) => console.log(annotatedAt.getTime()))
  return (
    <>
      <CardHeader className="flex flex-row gap-x-7 space-y-0 items-top">
        <CardTitle>{overlayMode}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 grow flex flex-col justify-center">
        {notes.map(({ note, annotatedAt }) =>
          <CardDescription key={annotatedAt.toString()}>
            {annotatedAt.getTime()} // {note}
          </CardDescription>)
        }
      </CardContent >
      <CardFooter className="flex w-full justify-between gap-x-2">
        <Button onClick={() => { hideOverlay({ courseId }) }}
          className="w-full">Close</Button>
      </CardFooter>
    </>
  )
}
