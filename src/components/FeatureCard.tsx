import { Card } from '@/components/ui/card';
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
    <Card className="w-full h-auto max-w-md bg-offwhite dark:bg-offblack border-solid">
      <div className="p-6 grid gap-6 bg-white dark:bg-black">
        <div className="flex items-center gap-4">
          <div className="bg-offwhite dark:bg-offblack rounded-md p-3 flex items-center justify-center">
            <Icon name={icon} className="w-6 h-6 text-offblack dark:text-offwhite" />
          </div>
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        <p className="text-offblack dark:text-offwhite">{description}</p>
      </div>
      <div className="bg-offwhite dark:bg-offblack p-6 grid gap-6">
        <h4 className="text-xl font-bold">Key Features</h4>
        <ul className="grid gap-4">
          {features.map(([key, value]) => (
            <li className="flex items-center gap-4">
              <Icon name={icon} className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              <div>
                <h5 className="font-medium">{key}</h5>
                <p className="text-gray-500 dark:text-gray-400">{value}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

