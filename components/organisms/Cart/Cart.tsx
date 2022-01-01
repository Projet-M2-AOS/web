import { Button } from "@components/atoms/Button";
import { Image } from "@components/atoms/Image";
import { Link } from "@components/atoms/Link";
import { Drawer } from "@components/molecules/Drawer";
import { XIcon } from "@heroicons/react/solid";
import { getUserCart } from "@lib/services/user/getUserCart";
import { updateUserCart } from "@lib/services/user/updateUserCart";
import { useSession } from "next-auth/react";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { Product } from "types/product";

export type CartProps = {
  hidden?: boolean;
  onClose?: () => void;
};

export const Cart = forwardRef<HTMLDivElement, CartProps>(
  ({ hidden, onClose }, ref) => {
    const { data: session } = useSession();
    const [shoppingCart, setShoppingCart] = useState<Product[]>([]);
    const totalCart = useMemo(
      () => shoppingCart.reduce((total, { price }) => total + price, 0),
      [shoppingCart]
    );

    const getShoppingCart = useCallback(() => {
      if (session?.user.id && !hidden)
        getUserCart(session.user.id).then(setShoppingCart);
    }, [session, hidden]);

    const removeProductFromCart = useCallback(
      (index: number) => {
        if (session?.user.id) {
          const newCart = shoppingCart
            .filter((_, i) => i !== index)
            .map(({ _id }) => _id);
          updateUserCart(session?.user.id, newCart).then(getShoppingCart);
        }
      },
      [getShoppingCart, session?.user.id, shoppingCart]
    );

    useEffect(getShoppingCart, [getShoppingCart]);
    return (
      <>
        <Drawer ref={ref} hidden={hidden} onClose={onClose} title="Mon Panier">
          <div className="p-3">
            {shoppingCart.length === 0 && <p>Votre panier est vide</p>}
            <ul className="space-y-3 font-normal">
              {shoppingCart.map((product, index) => (
                <li className="relative" key={index.toString() + product._id}>
                  <Link
                    className="flex gap-2 cursor-pointer"
                    href={"/products/" + product._id}
                    onClick={onClose}
                  >
                    <div className="relative flex-shrink-0 w-20 h-20 border border-neutral-200">
                      <Image src={product.imageUrls[0]} alt="" layout="fill" />
                    </div>
                    <div className="flex-1">
                      <div className="pr-5 font-medium">{product.title}</div>
                      <div className="text-primary-700">
                        {product.price.toFixed(2)}€
                      </div>
                    </div>
                  </Link>
                  <XIcon
                    className="absolute right-0 z-10 w-4 h-4 cursor-pointer top-1"
                    onClick={() => removeProductFromCart(index)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="px-3 py-3 space-y-3 border-t border-neutral-200">
            <div className="flex justify-between font-medium">
              <span className="flex-1">Montant du panier</span>
              <span className="text-primary-700">{totalCart.toFixed(2)}€</span>
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
