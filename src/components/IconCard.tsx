import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Compass, GitBranch, Brain, Waves, Network, Layers, Boxes } from 'lucide-react';

const IconMap = {
  Compass: Compass,
  GitBranch: GitBranch,
  Brain: Brain,
  Waves: Waves,
  Network: Network,
  Layers: Layers,
  Boxes: Boxes,
};

type Props = {
  title: string,
  description: string,
  icon: string
}


export const IconCard = ({ title, description, icon }: Props) => {
  // @ts-ignore
  const Icon = IconMap[icon] || Boxes;
  return (
    <Card className="h-full">
      <CardHeader>
        <Icon className="w-8 h-8 mb-2" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};
