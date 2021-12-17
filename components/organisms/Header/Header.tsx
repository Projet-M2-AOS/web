import { Logo } from "@components/atoms/Logo";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/outline";
import { MenuIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import type { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="flex items-center h-20 grid-cols-3 px-4 shadow-md text-neutral-50 bg-primary-800 md:grid">
      <div className="mr-2 cursor-pointer md:hidden">
        <MenuIcon className="w-8" />
      </div>
      <Logo className="w-32 h-auto translate-y-[2px] fill-current" />
      <ul className="self-center hidden space-x-4 text-xl font-bold md:flex justify-self-center">
        {["Accueil", "Produits", "Promotions", "Catégories"].map((label) => (
          <li
            key={label}
            className={classNames(
              "cursor-pointer hover:text-neutral-300 transition-colors duration-150"
            )}
          >
            {label}
          </li>
        ))}
      </ul>
      <div className="flex ml-auto space-x-2 justify-self-end md:ml-0">
        <ShoppingBagIcon className="w-6 h-6 transition-colors duration-150 cursor-pointer hover:text-neutral-300" />
        <UserIcon className="w-6 h-6 transition-colors duration-150 cursor-pointer hover:text-neutral-300" />
      </div>
    </header>
  );
};
