import { StarIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import type { FC } from "react";

export type RatingValueProps = React.ComponentProps<"div"> & {
  value: number;
  valueFixed?: number;
};

export const RatingValue: FC<RatingValueProps> = ({
  className,
  valueFixed = 0,
  value,
  ...props
}) => {
  if (!value) return null;
  return (
    <div
      className={classNames(className, "flex items-center gap-x-0.5")}
      {...props}
    >
      <span className="font-semibold">{`${value.toFixed(valueFixed)}`}</span>
      <StarIcon className="w-4 h-4 text-yellow-500" />
    </div>
  );
};
