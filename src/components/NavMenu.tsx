import { Button } from "@/components/ui/button"
import { Icon } from "@/components/Icon"
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Logo } from "./Logo";
import { useState } from "react";

export function NavMenu({ initialState }: { initialState: boolean }) {
  const [isOpen, setOpen] = useState(initialState);
  const side = "left";
  const toggleSidebar = () => {
    const newState = !isOpen;
    setOpen(newState);
  };
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          onClick={toggleSidebar}
          className="rounded-full p-2 aspect-square
        bg-secondary-dark/90 text-offwhite 
        dark:bg-secondary/90 hover:bg-secondary/50 hover:dark:bg-secondary/50 dark:text-offwhite">
          <Icon name={isOpen ? "X" : "Menu"} className="w-full h-full" />
        </Button>
      </SheetTrigger>
      <SheetContent className="text-left border-none bg-offwhite dark:bg-offblack flex flex-col justify-between" side={side}>
        <SheetHeader className="text-left">
          <SheetTitle className="sr-only"></SheetTitle>
          <Logo className="text-1xl md:text-2xl" />
        </SheetHeader>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {[
              { title: "Home", href: "/" },
              { title: "Blog", href: "/posts" },
              { title: "Courses", href: "/offcourse" }
            ].map(({ title, href }) => (<li>
              <a
                href={href}
                className="flex items-center gap-3 rounded-md py-2 text-md font-bold transition-colors hover:bg-white hover:text-secondary data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
              >
                {title}
              </a>
            </li>))}
          </ul>
        </nav>
        <SheetFooter className="justify-start items-end">
          <ThemeToggle />
        </SheetFooter>
      </SheetContent>
    </Sheet>)
}
