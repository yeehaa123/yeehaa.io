import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cx } from "class-variance-authority";
import { Icon } from "@/components/Icon"

export type FeatureCardProps = {
  className?: string
  title: string,
  icon: string,
  description: string,
  features: Record<string, string>,
  iconSize?: "SMALL" | "LARGE"
}

export function FeatureCard({ title, icon, description, features: f, iconSize = "SMALL", className }: FeatureCardProps) {
  const features = Object.entries(f)
  const iconClass = iconSize === "SMALL" ? "w-8 h-8 mb-2 @md:mb-4" : "w-full h-full mb-4 aspect-square";
  return (
    <div className="@container w-full">
      <Card className={cx(
        "grid grid-cols-1 rounded-none @md:grid-cols-2 h-auto border-solid text-left",
        className)}>
        <CardHeader>
          <Icon name={icon} className={iconClass} />
          <CardTitle>{title}</CardTitle>
          <p className="text-offblack dark:text-offwhite">{description}</p>
        </CardHeader>
        <CardContent className="grid gap-6 ">
          <ul className="grid gap-4 py-6">
            {features.map(([key, value]) => (
              <li key={key}>
                <h5 className="font-medium">{key}</h5>
                <p className="text-gray-500 dark:text-gray-400">{value}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

