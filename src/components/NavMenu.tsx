import { Button } from "@/components/ui/button"
import { Icon } from "@/components/Icon"
import { DarkModeToggle } from "@/components/DarkModeToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function NavMenu() {
  const side = "left";
  return (
    <Sheet key={side}>
      <SheetTrigger asChild>
        <Button className="bg-primary-light text-secondary dark:bg-primary-light hover:bg-white dark:text-secondary"><Icon name="Menu" className="w-full h-full" /></Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          TBD
        </div>
        <SheetFooter>
          <DarkModeToggle />
        </SheetFooter>
      </SheetContent>
    </Sheet>)
}
