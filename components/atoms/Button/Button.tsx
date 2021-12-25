import classNames from "classnames";
import type { FC } from "react";

export type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "tertiary";
  padding?: string;
  rounded?: string;
  widthFull?: boolean;
};

export const Button: FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  padding = "px-5 py-3.5",
  rounded = "rounded-md",
  widthFull,
  ...props
}) => {
  return (
    <button
      className={classNames(className, "font-medium leading-none", rounded, {
        [padding]: variant !== "tertiary",
        "bg-primary-700 text-white hover:bg-primary-800": variant === "primary",
        "border border-neutral-200 text-neutral-700 bg-white hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-900":
          variant === "secondary",
        "text-primary-700 hover:text-primary-800": variant === "tertiary",
        "w-full": widthFull,
      })}
      {...props}
    >
      {children}
    </button>
  );
};
