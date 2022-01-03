import classNames from "classnames";
import { FC, useMemo } from "react";

export type DateInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "type"
> & {
  label?: string;
  error?: boolean;
  widthFull?: boolean;
  value: Date;
};

export const DateInput: FC<DateInputProps> = ({
  label,
  className,
  error = false,
  widthFull = true,
  value,
  ...props
}) => {
  const dateValue = useMemo(() => {
    const offset = value.getTimezoneOffset();
    return new Date(value.getTime() - offset * 60 * 1000)
      .toISOString()
      .split("T")[0];
  }, [value]);
  return (
    <label
      className={classNames("text-neutral-700", {
        "w-full": widthFull,
      })}
    >
      <span className="block mb-1.5 font-medium leading-none">{label}</span>
      <input
        className={classNames(className, "w-full px-2 py-1 rounded-md", {
          "border-yellow-600 border-2": error,
          "border-neutral-100 border": !error,
        })}
        type="date"
        defaultValue={dateValue}
        {...props}
      />
    </label>
  );
};
