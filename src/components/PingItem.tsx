import { cx } from 'class-variance-authority';
import {
  Waves,
  Network
} from 'lucide-react';

const IconMap = {
  Network: Network,
  Waves: Waves,
};

export type PingItemProps = {
  title: string,
  description: string,
  icon: string
  className?: string,
}

export function PingItem({ title, icon, description, className }: PingItemProps) {
  // @ts-ignore
  const Icon = IconMap[icon];
  return (
    <div className={cx("relative flex flex-col items-start gap-4 p-6 text-center", className)}>
      <div className="w-full flex justify-center items-center animate-ping text-black aspect-square rounded-full border-none bg-primary">
        <Icon className="w-36 h-36" />
      </div>
      <div className="space-y-2 relative">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 ">{description}</p>
      </div>
    </div>)
}
