import classNames from "classnames";
import type { FC } from "react";

export type OverlayProps = {
  hidden?: boolean;
};

export const Overlay: FC<OverlayProps> = ({ hidden }) => {
  return (
    <div
      className={classNames(
        "fixed inset-0 z-20 bg-neutral-900 transition-opacity",
        {
          "bg-opacity-0 pointer-events-none": hidden,
          "bg-opacity-80": !hidden,
        }
      )}
    />
  );
};
