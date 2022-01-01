import type { FC } from "react";

export type IconLabelProps = {
  icon: JSX.Element;
  value: string;
};

export const IconLabel: FC<IconLabelProps> = ({ icon, value }) => {
  return (
    <div className="flex items-center gap-1">
      {icon}
      <span className="font-medium">{value}</span>
    </div>
  );
};
