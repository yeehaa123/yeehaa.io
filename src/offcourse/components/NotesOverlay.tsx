import { Button } from "@/components/ui/button"
import {
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { NoteForm } from "./NoteForm";
import type { Note } from "../schema";
import type { CourseCardState } from "./CourseCard";

export function NotesOverlay(
  { courseId, actions, cardState }: CourseCardState) {
  const { overlayMode, notes } = cardState;
  const { hideOverlay, addNote } = actions;
  const noteId = `${courseId}-note`;
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
        <NoteForm noteId={noteId}
          onConfirm={(note: Note) => addNote({ ...note, courseId })} />
      </CardContent >
      <CardFooter className="flex w-full justify-between gap-x-2">
        <Button type="submit" form={noteId} className="w-full">Save Note</Button>
        <Button onClick={() => { hideOverlay({ courseId }) }}
          className="w-full">Close</Button>
      </CardFooter>
    </>
  )
}
