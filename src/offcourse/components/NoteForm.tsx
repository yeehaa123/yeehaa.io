import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import type { Note } from "../schema"

const noteFormSchema = z.object({
  note: z.string().min(10).max(500),
});

export type Props = {
  noteId: string,
  onConfirm: (v: Note) => void,

}

export function NoteForm({ onConfirm, noteId }: Props) {
  const form = useForm<z.infer<typeof noteFormSchema>>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      note: "",
    },
  })

  function onSubmit({ note }: z.infer<typeof noteFormSchema>) {
    form.reset();
    return onConfirm({ note, annotatedAt: new Date });
  }

  return (
    <Form {...form}>
      <form
        id={noteId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col justify-between min-h-[100px]">
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem className="flex flex-col grow">
              <FormControl>
                <Textarea placeholder="leave your notes here"
                  className="grow resize-none"
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
