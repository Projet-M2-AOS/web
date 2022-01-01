import { User } from "@customTypes/user";
import axios from "axios";

export const updateUserCart = async (userId: string, cart: string[]) => {
  await axios.put<User[]>("/api/users/" + userId, { shoppingCart: cart });
};
