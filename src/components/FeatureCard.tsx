import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cx } from "class-variance-authority";
import { Icon } from "@/components/Icon"

type Props = {
  className?: string
  title: string,
  icon: string,
  description: string,
  features: Record<string, string>,
  iconSize: "SMALL" | "LARGE"
}

export function FeatureCard({ title, icon, description, features: f, iconSize = "SMALL", className }: Props) {
  const features = Object.entries(f)
  const iconClass = iconSize === "SMALL" ? "w-8 h-8 mb-2 @md:mb-4" : "w-full h-full mb-4";
  return (
    <div className="@container w-full">
      <Card className={cx(
        "grid @sm:grid-cols-1 rounded-none @lg:grid-cols-2 h-auto border-solid text-left",
        className)}>
        <CardHeader>
          <Icon name={icon} className={iconClass} />
          <CardTitle>{title}</CardTitle>
          <p className="text-offblack dark:text-offwhite">{description}</p>
        </CardHeader>
        <CardContent className="grid gap-6 ">
          <ul className="grid gap-4 py-6">
            {features.map(([key, value]) => (
              <li>
                <div>
                  <h5 className="font-medium">{key}</h5>
                  <p className="text-gray-500 dark:text-gray-400">{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

