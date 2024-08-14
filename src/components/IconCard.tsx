import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { cx } from "class-variance-authority";
import { Icon } from "@/components/Icon";

export type IconCardProps = {
  title: string,
  description: string,
  icon: string
  className?: string,
}

export const IconCard = ({ title, description, icon, className }: IconCardProps) => {
  return (
    <Card className={cx("rounded-none h-full", className)}>
      <CardHeader>
        <Icon name={icon} className="w-8 h-8 mb-2" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};
