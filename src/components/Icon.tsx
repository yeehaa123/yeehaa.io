import {
  AlignJustify,
  Compass,
  Network,
  Layers,
  Sun,
  LucideMoon,
  Star,
  PuzzleIcon,
  EyeOff,
  Share,
  Users,
  Turtle,
  Target,
  Waves,
  Brain,
  X,
  GitBranch,
  Boxes,
  Camera
} from 'lucide-react';
import { Logo as Offcourse } from "@/offcourse/components/Logo";
import { Logo as Rizom } from "@/components/RizomLogo";

const IconMap = {
  Compass: Compass,
  X,
  Network: Network,
  Layers: Layers,
  PuzzlePiece: PuzzleIcon,
  EyeOff: EyeOff,
  Turtle: Turtle,
  Menu: AlignJustify,
  Target: Target,
  Share: Share,
  Users: Users,
  Waves: Waves,
  Brain: Brain,
  GitBranch: GitBranch,
  Rizom: Rizom,
  Offcourse: Offcourse,
  Sun: Sun,
  Star: Star,
  Moon: LucideMoon,
  Boxes: Boxes,
  Camera: Camera
};

export function Icon({ name, className }: { name: string, className?: string }) {
  // @ts-ignore
  const Icon = IconMap[name] || Boxes;
  return <Icon className={className} />

}
