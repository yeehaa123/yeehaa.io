import { cx } from "class-variance-authority"

type Props = {
  className?: string,
  href?: string
}
export function Logo({ className, href = "/" }: Props) {
  return (
    <h1 className={cx("group font-sans font-black", className)}>
      <a href={href}>
        <span className="inline-block -translate-y-1 group-hover:translate-y-0
      text-secondary-light group-hover:text-secondary-dark">YEE</span>
        <span className="inline-block group-hover:translate-y-0 translate-y-1
      text-secondary-dark group-hover:text-secondary-light">HAA</span>
      </a>
    </h1>)
}
