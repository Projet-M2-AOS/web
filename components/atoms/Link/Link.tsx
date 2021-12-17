import NextLink from "next/link";

export type LinkProps = React.ComponentProps<"a">;

export const Link: React.FC<LinkProps> = ({
  href = "#",
  children,
  ...props
}) => {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
};
