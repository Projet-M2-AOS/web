import { Link } from "@components/atoms/Link";
import { Logo } from "@components/atoms/Logo";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/outline";
import { MenuIcon } from "@heroicons/react/solid";
import useClickOutside from "@hooks/useClickOutside";
import classNames from "classnames";
import { FC, useState } from "react";
import { Cart } from "../Cart";

export const Header: FC = () => {
  const [showCart, setShowCart] = useState(false);

  const cartRef = useClickOutside<HTMLDivElement>(() => {
    setShowCart(false);
  });

  return (
    <header className="z-20 flex items-center h-20 grid-cols-3 px-4 text-white bg-neutral-700 md:grid">
      <div className="mr-2 cursor-pointer md:hidden">
        <MenuIcon className="w-8" />
      </div>
      <Link href="/">
        <Logo className="w-32 h-auto translate-y-[2px] fill-primary-300" />
      </Link>
      <ul className="self-center hidden space-x-4 text-xl font-semibold md:flex justify-self-center">
        {[
          { label: "Accueil", href: "/" },
          { label: "Produits", href: "/products" },
          { label: "Nouveautés", href: "#" },
          { label: "Promotions", href: "#" },
        ].map(({ label, href }) => (
          <li
            key={label}
            className={classNames(
              "cursor-pointer hover:text-neutral-200 transition-colors duration-200"
            )}
          >
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
      <div className="flex ml-auto space-x-2 justify-self-end md:ml-0">
        <ShoppingBagIcon
          className="w-6 h-6 transition-colors duration-200 cursor-pointer hover:text-neutral-200"
          onClick={() => setShowCart(true)}
        />
        <Link href="/account/auth">
          <UserIcon className="w-6 h-6 transition-colors duration-200 cursor-pointer hover:text-neutral-200" />
        </Link>
      </div>
      <Cart
        ref={cartRef}
        hidden={!showCart}
        onClose={() => setShowCart(false)}
      />
    </header>
  );
};
