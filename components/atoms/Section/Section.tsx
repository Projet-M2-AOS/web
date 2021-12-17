import classNames from "classnames";
import type { FC } from "react";

export type SectionProps = React.ComponentProps<"section"> & {
  title: string;
};

export const Section: FC<SectionProps> = ({
  children,
  className,
  title,
  ...props
}) => {
  return (
    <section className={classNames(className, "container")} {...props}>
      <h2 className="text-2xl text-center">{title}</h2>
      {children}
    </section>
  );
};
