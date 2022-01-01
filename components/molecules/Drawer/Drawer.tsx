import { Overlay } from "@components/atoms/Overlay";
import { XIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { forwardRef } from "react";

export type DrawerProps = React.ComponentProps<"div"> & {
  hidden?: boolean;
  position?: "LEFT" | "RIGHT";
  title?: string;
  onClose?: () => void;
};

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  ({ children, hidden, onClose, title, position = "RIGHT", ...props }, ref) => {
    return (
      <>
        <Overlay hidden={hidden} />
        <div
          ref={ref}
          className={classNames(
            "fixed z-30 w-full max-w-drawer mx-auto bg-white inset-y-0 overflow-auto text-neutral-900 transition-opacity",
            {
              "opacity-0 pointer-events-none": hidden,
              "opacity-100": !hidden,
              "left-0 shadow-drawer-left": position === "LEFT",
              "right-0 shadow-drawer-right": position === "RIGHT",
            }
          )}
          {...props}
        >
          <div className="flex items-center gap-2 p-3 text-white bg-neutral-700">
            <XIcon className="w-5 h-5 cursor-pointer" onClick={onClose} />
            <span className="flex-1 font-medium">{title}</span>
          </div>
          {children}
        </div>
      </>
    );
  }
);

Drawer.displayName = "Drawer";
