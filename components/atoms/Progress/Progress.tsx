import classNames from "classnames";
import type { FC } from "react";

export type ProgressProps = React.ComponentProps<"div"> & {
  value: number;
};

export const Progress: FC<ProgressProps> = ({ className, value, ...props }) => {
  return (
    <div
      className={classNames(className, "bg-neutral-200 rounded-full h-2.5")}
      {...props}
    >
      <div
        className="bg-primary-600 h-2.5 rounded-full"
        style={{ width: `${(value * 100).toFixed(0)}%` }}
      ></div>
    </div>
  );
};
