import classNames from "classnames";
import type { FC } from "react";

export type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "secondary";
};

export const Button: FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  ...props
}) => {
  return (
    <button
      className={classNames(className, "rounded-md px-5 py-2.5", {
        "bg-primary-700 hover:bg-primary-800 text-white": variant === "primary",
        "border border-primary-700 text-primary-700 shadow-md hover:bg-neutral-100":
          variant === "secondary",
      })}
      {...props}
    >
      {children}
    </button>
  );
};
