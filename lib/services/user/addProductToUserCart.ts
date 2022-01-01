import { User } from "@customTypes/user";
import axios from "axios";

export const addProductToUserCart = async (
  userId: string,
  productId: string
) => {
  const user = await axios
    .get<User[]>("/api/users")
    .then((res) => res.data)
    .then((users) => users.find((e) => e._id === userId));

  if (!user) throw new Error("User Not Found");

  const newCart = user.shoppingCart.concat([productId]);

  await axios.put<User[]>("/api/users/" + userId, { shoppingCart: newCart });
};
