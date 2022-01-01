import { User } from "@customTypes/user";
import axios from "axios";

export const clearUserCart = async (userId: string) => {
  const user = await axios
    .get<User>("/api/users/" + userId)
    .then((res) => res.data);

  if (!user) throw new Error("User Not Found");

  await axios.put<User[]>("/api/users/" + userId, { shoppingCart: [] });
};
