import { useState } from "react";
import { Button, Icon, ThemeToggle, Logo } from "@/components";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NavItem } from "./NavItem";

export function NavMenu({ navItems }: { navItems: { title: string, href: string }[] }) {
  const [isOpen, setOpen] = useState(false);
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
            {navItems.map((item, index) => <NavItem key={index} {...item} />)}
          </ul>
        </nav>
        <SheetFooter className="justify-start items-end">
          <ThemeToggle />
        </SheetFooter>
      </SheetContent>
    </Sheet>)
}
