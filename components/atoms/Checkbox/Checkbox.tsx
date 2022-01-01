import { CheckIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import type { FC } from "react";

export type CheckboxProps = React.ComponentProps<"input">;

export const Checkbox: FC<CheckboxProps> = (props) => {
  return (
    <label>
      <input type="checkbox" className="hidden appearance-none" {...props} />
      <div
        className={classNames(
          "w-4 h-4 border rounded-sm appearance-none border-neutral-200",
          { "bg-primary-600": props.checked }
        )}
      >
        {props.checked && <CheckIcon className="w-3.5 h-3.5 text-white" />}
      </div>
    </label>
  );
};
