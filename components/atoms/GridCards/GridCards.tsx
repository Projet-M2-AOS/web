import classNames from "classnames";
import type { FC } from "react";

export type GridCardsProps = React.ComponentProps<"div">;

export const GridCards: FC<GridCardsProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={classNames(
        className,
        "grid items-center max-w-xs grid-cols-1 mx-auto md:grid-cols-2 md:max-w-2xl xl:grid-cols-4 gap-x-4 gap-y-6 xl:max-w-none"
      )}
      {...props}
    >
      {children}
    </div>
  );
};
