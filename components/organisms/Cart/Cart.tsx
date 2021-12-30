import { Button } from "@components/atoms/Button";
import { Drawer } from "@components/molecules/Drawer";
import { forwardRef } from "react";

export type CartProps = {
  hidden?: boolean;
  onClose?: () => void;
};

export const Cart = forwardRef<HTMLDivElement, CartProps>(
  ({ hidden, onClose }, ref) => {
    return (
      <>
        <Drawer ref={ref} hidden={hidden} onClose={onClose} title="Mon Panier">
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
        </Drawer>
      </>
    );
  }
);

Cart.displayName = "Cart";
