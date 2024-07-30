import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
  Compass,
  Network,
  Layers,
  PuzzleIcon,
  EyeOff,
  Turtle,
  Target,
  Waves,
  Brain,
  GitBranch,
  Boxes,
  Camera
} from 'lucide-react';

const IconMap = {
  Compass: Compass,
  Network: Network,
  Layers: Layers,
  PuzzlePiece: PuzzleIcon,
  EyeOff: EyeOff,
  Turtle: Turtle,
  Target: Target,
  Waves: Waves,
  Brain: Brain,
  GitBranch: GitBranch,
  Boxes: Boxes,
  Camera: Camera
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
    <Card className="rounded-none h-full">
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
