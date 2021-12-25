import { Button } from "@components/atoms/Button";
import { XIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { forwardRef } from "react";

export type CartProps = {
  hidden?: boolean;
  onClose?: () => void;
};

export const Cart = forwardRef<HTMLDivElement, CartProps>(
  ({ hidden, onClose }, ref) => {
    return (
      <>
        <div
          className={classNames(
            "fixed inset-0 z-20 bg-neutral-900 transition-opacity duration-200",
            {
              "bg-opacity-0 pointer-events-none": hidden,
              "bg-opacity-80": !hidden,
            }
          )}
        />
        <div
          ref={ref}
          className={classNames(
            "fixed z-30 w-full max-w-cart mx-auto bg-white right-0 top-0 bottom-0 text-neutral-900 transition-opacity duration-200",
            {
              "opacity-0 pointer-events-none": hidden,
              "opacity-100": !hidden,
            }
          )}
          style={{ boxShadow: "rgba(0, 0, 0, 0.4) -4px 0 10px 0" }}
        >
          <div className="flex items-center gap-2 p-3 text-white bg-neutral-700">
            <XIcon
              className="w-5 h-5 cursor-pointer fill-current"
              onClick={onClose}
            />
            <span className="flex-1 font-medium">Votre panier</span>
            <span className="">3 produits</span>
          </div>
          <ul className="p-3 font-medium">
            <li>1x Plus plus</li>
            <li>1x Plus plus</li>
            <li>1x Plus plus</li>
          </ul>
          <div className="px-3 py-3 space-y-3 border-t border-neutral-200">
            <div className="flex justify-between font-semibold">
              <span className="flex-1">Montant du panier</span>
              <span>390.00€</span>
            </div>
            <Button padding="px-3 py-2" widthFull>
              Commander
            </Button>
          </div>
        </div>
      </>
    );
  }
);

Cart.displayName = "Cart";
