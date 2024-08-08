import { Button } from "@/components/ui/button"
import { Icon } from "@/components/Icon"
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Logo } from "./Logo";

export function NavMenu() {
  const side = "left";
  return (
    <Sheet key={side}>
      <SheetTrigger asChild>
        <Button className="rounded-full p-2 aspect-square 
        bg-secondary-dark/90 text-offwhite 
        dark:bg-secondary/90 hover:bg-secondary/50 hover:dark:bg-secondary/50 dark:text-offwhite">
          <Icon name="Menu" className="w-full h-full" />
        </Button>
      </SheetTrigger>
      <SheetContent className="border-none flex flex-col justify-between" side={side}>
        <SheetHeader>
          <SheetTitle><Logo className="text-1xl md:text-2xl" /></SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 ">
          TBD
        </div>
        <SheetFooter className="sm:justify-start">
          <Button className="rounded-full p-2 aspect-square 
        bg-secondary-dark/90 text-offwhite 
        dark:bg-secondary/90 hover:bg-secondary/50 hover:dark:bg-secondary/50 dark:text-offwhite">
            <ThemeToggle />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>)
}
