import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Fragment } from 'react/jsx-runtime';
import { Icon } from "@/components/Icon"

type Props = {
  title: string,
  icon: string,
  description: string,
  features: Record<string, string>,
}


export const ProductCard = ({ title, icon, description, features: f }: Props) => {
  const features = Object.entries(f)
  return (
    <Card className="w-full h-full rounded-none">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Icon name={icon} className="h-6 w-6" />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <dl>
          {features.map(([key, value]) => {
            return <Fragment key={key}>
              <dt className="font-bold">{key}</dt>
              <dd className="text-gray-500 dark:text-gray-400">{value}</dd>
            </Fragment>
          })}
        </dl>
      </CardContent>
    </Card>);
}

