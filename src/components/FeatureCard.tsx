import { Card, CardHeader, CardDescription, CardTitle, CardContent } from '@/components/ui/card';
import { Icon } from "@/components/Icon"

type Props = {
  title: string,
  icon: string,
  description: string,
  features: Record<string, string>,
}

export function FeatureCard({ title, icon, description, features: f }: Props) {
  const features = Object.entries(f)
  return (
    <Card className="w-full h-auto max-w-md bg-white dark:bg-black border-solid">
      <CardHeader>
        <Icon name={icon} className="w-8 h-8 mb-2" />
        <CardTitle>{title}</CardTitle>
        <p className="text-offblack dark:text-offwhite">{description}</p>
      </CardHeader>
      <CardContent className="p-6 grid gap-6">
        <ul className="grid gap-4">
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
  )
}

