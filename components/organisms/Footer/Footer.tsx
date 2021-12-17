import { Logo } from "@components/atoms/Logo";
import type { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="flex flex-col items-center py-6 space-y-1 text-neutral-50 bg-primary-800">
      <div>
        <Logo className="fill-current" />
      </div>
      <div>© AOS Team - 2021</div>
    </footer>
  );
};
