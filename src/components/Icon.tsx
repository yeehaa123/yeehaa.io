import {
  Compass,
  Network,
  Layers,
  PuzzleIcon,
  EyeOff,
  Share,
  Users,
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
  Share: Share,
  Users: Users,
  Waves: Waves,
  Brain: Brain,
  GitBranch: GitBranch,
  Boxes: Boxes,
  Camera: Camera
};

export function Icon({ name, className }: { name: string, className?: string }) {
  // @ts-ignore
  const Icon = IconMap[name] || Boxes;
  return <Icon className={className} />

}
