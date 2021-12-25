import classNames from "classnames";
import type { FC } from "react";

export type ProgressProps = React.ComponentProps<"div"> & {
  value: number;
};

export const Progress: FC<ProgressProps> = ({ className, value, ...props }) => {
  return (
    <div
      className={classNames(
        className,
        "bg-neutral-100 border border-neutral-200 rounded-md overflow-hidden h-3"
      )}
      {...props}
    >
      <div
        className="h-full bg-yellow-500 rounded-r-md"
        style={{ width: `${(value * 100).toFixed(0)}%` }}
      />
    </div>
  );
};
