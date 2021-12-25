import classNames from "classnames";
import NextLink from "next/link";

export type LinkProps = React.ComponentProps<"a">;

export const Link: React.FC<LinkProps> = ({
  className,
  href = "#",
  children,
  ...props
}) => {
  return (
    <NextLink href={href}>
      <a className={classNames(className)} {...props}>
        {children}
      </a>
    </NextLink>
  );
};
