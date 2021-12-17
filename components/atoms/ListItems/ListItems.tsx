import classNames from "classnames";
import type { FC } from "react";

export type ListItemsProps = React.ComponentProps<"div">;

export const ListItems: FC<ListItemsProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={classNames(
        className,
        "flex flex-col border border-neutral-300 rounded-md overflow-hidden divide-y divide-neutral-300"
      )}
      {...props}
    >
      {children}
    </div>
  );
};
