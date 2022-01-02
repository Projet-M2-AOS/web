import classNames from "classnames";
import type { FC } from "react";

export type TextInputProps = React.ComponentProps<"input"> & {
  label?: string;
  error?: boolean;
  widthFull?: boolean;
};

export const TextInput: FC<TextInputProps> = ({
  label,
  className,
  error = false,
  widthFull = true,
  ...props
}) => {
  return (
    <label
      className={classNames("block text-neutral-700", {
        "w-full": widthFull,
      })}
    >
      <span className="block mb-1.5 font-medium leading-none">{label}</span>
      <input
        className={classNames(className, "w-full px-2 py-1 rounded-md", {
          "border-yellow-600 border-2": error,
          "border-neutral-100 border": !error,
        })}
        {...props}
      />
    </label>
  );
};
