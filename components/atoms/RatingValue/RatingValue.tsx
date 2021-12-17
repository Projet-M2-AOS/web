import { StarIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import type { FC } from "react";

export type RatingValueProps = React.ComponentProps<"div"> & {
  value: number;
  valueFixed?: number;
  reverseOrder?: boolean;
};

export const RatingValue: FC<RatingValueProps> = ({
  className,
  valueFixed = 0,
  value,
  reverseOrder,
  ...props
}) => {
  return (
    <div
      className={classNames(className, "flex items-center gap-x-[3px]", {
        "flex-row-reverse": reverseOrder,
      })}
      {...props}
    >
      <StarIcon className="w-4 h-4" />
      <span>{`${value.toFixed(valueFixed)}`}</span>
    </div>
  );
};
