import classNames from "classnames";
import type { FC } from "react";

export type BaseCardProps = React.ComponentProps<"div">;

export const BaseCard: FC<BaseCardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={classNames(
        className,
        "flex flex-col w-full max-w-xs px-3 py-2 overflow-hidden border rounded-md shadow-md border-neutral-200 bg-white"
      )}
      {...props}
    >
      {children}
    </div>
  );
};
