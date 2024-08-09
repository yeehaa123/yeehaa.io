import { cx } from "class-variance-authority"

export type NavItemProps = {
  title: string,
  href: string,
  className?: string
}
export function NavItem({ title, href, className }: NavItemProps) {
  return (
    <li key={href}
      className={cx("flex items-center gap-3 rounded-md py-2 text-md text-2xl font-bold text-offblack dark:text-offwhite transition-colors hover:text-secondary data-[active=true]:text-secondary-dark", className)}>
      <a href={href}>{title}</a>
    </li>)
}
