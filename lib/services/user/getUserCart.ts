import { getProduct } from "@lib/services/product/getProduct";
import axios from "axios";
import { Product } from "types/product";
import { User } from "types/user";

export const getUserCart = async (userId: string) => {
  const user = await axios
    .get<User[]>("/api/users")
    .then((res) => res.data)
    .then((users) => users.find((e) => e._id === userId));

  if (!user) throw new Error("User Not Found");

  return await Promise.all(user.shoppingCart.map<Promise<Product>>(getProduct));
};
