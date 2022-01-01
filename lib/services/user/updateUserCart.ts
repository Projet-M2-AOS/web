import axios from "axios";
import { User } from "types/user";

export const updateUserCart = async (userId: string, cart: string[]) => {
  await axios.put<User[]>("/api/users/" + userId, { shoppingCart: cart });
};
