import { clearUserCart } from "@lib/services/cart/clearUserCart";
import axios from "axios";
import { User } from "types/user";

export const createOrder = async (
  userId: string,
  products: string[],
  price: number
) => {
  const user = await axios
    .get<User>("/api/users/" + userId)
    .then((res) => res.data);

  if (!user) throw new Error("User Not Found");

  return axios
    .post(`/api/orders`, [
      { user: userId, address: user.address, products, price },
    ])
    .then(() => clearUserCart(userId));
};
