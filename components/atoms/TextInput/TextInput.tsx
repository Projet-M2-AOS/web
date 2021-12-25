import classNames from "classnames";
import type { FC } from "react";

export type TextInputProps = React.ComponentProps<"input"> & {
  label?: string;
  widthFull?: boolean;
};

export const TextInput: FC<TextInputProps> = ({
  label,
  className,
  widthFull = true,
  ...props
}) => {
  return (
    <label
      className={classNames("text-neutral-700", {
        "w-full": widthFull,
      })}
    >
      <span className="block mb-1.5 font-medium leading-none">{label}</span>
      <input
        className={classNames(
          className,
          "border border-neutral-100 w-full px-2 py-1 rounded-md"
        )}
        {...props}
      />
    </label>
  );
};
