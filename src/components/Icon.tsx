import {
  Compass,
  Network,
  Layers,
  Sun,
  MoonStar,
  PuzzleIcon,
  MenuIcon,
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
import { Logo as Offcourse } from "@/offcourse/components/Logo";
import { Logo as Rizom } from "@/components/RizomLogo";

const IconMap = {
  Compass: Compass,
  Network: Network,
  Layers: Layers,
  PuzzlePiece: PuzzleIcon,
  EyeOff: EyeOff,
  Turtle: Turtle,
  Menu: MenuIcon,
  Target: Target,
  Share: Share,
  Users: Users,
  Waves: Waves,
  Brain: Brain,
  GitBranch: GitBranch,
  Rizom: Rizom,
  Offcourse: Offcourse,
  Sun: Sun,
  Moon: MoonStar,
  Boxes: Boxes,
  Camera: Camera
};

export function Icon({ name, className }: { name: string, className?: string }) {
  // @ts-ignore
  const Icon = IconMap[name] || Boxes;
  return <Icon className={className} />

}
