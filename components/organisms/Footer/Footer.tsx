import { Logo } from "@components/atoms/Logo";
import type { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="flex flex-col items-center justify-center h-32 space-y-1 text-white bg-neutral-700">
      <div>
        <Logo className="fill-primary-300" />
      </div>
      <div>© AOS Team - 2021</div>
    </footer>
  );
};
