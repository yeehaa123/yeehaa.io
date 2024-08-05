import { NarrowSection } from "@/components/NarrowSection";
import { IconCard, type IconCardProps } from "@/components/IconCard";
import { cx } from "class-variance-authority";

type Props = {
  title: string,
  subtitle: string,
  description: string,
  items: IconCardProps[]
  orientation: "horizontal" | "vertical",
  className?: string
}

export function CardsSection({ title, subtitle, description, items, orientation = "horizontal", className }: Props) {
  const gridCols = orientation === "horizontal" ? 2 : 1;
  return (
    <NarrowSection className={cx("py-12 md:py-24 lg:py-32", className)}>
      <div className={`grid items-center justify-center gap-8 px-4 md:px-6 lg:text-left lg:grid-cols-${gridCols}`} >
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className={`text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl`}>
              {title}
            </h2>
            {subtitle && <p className="text-xl mb-8">{subtitle}</p>}
            <p className="text-muted-foreground 
      md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {description}
            </p>
          </div>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-${orientation === "horizontal" ? 2 : 3} gap-4`}>
          {items.map((item, index) => (
            <IconCard key={index} {...item} />
          ))}
        </div>
      </div>
    </NarrowSection >)
}
