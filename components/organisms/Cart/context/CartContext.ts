import { createContext, Dispatch, SetStateAction } from "react";

export type CartContextProps = {
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
};

export const CartContext = createContext<CartContextProps>({
  showCart: false,
  setShowCart: () => null,
});
