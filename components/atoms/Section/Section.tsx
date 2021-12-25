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
      <h2 className="pb-1 mb-5 text-2xl border-b-2 cursor-pointer border-neutral-200">
        {title}
      </h2>
      {children}
    </section>
  );
};
