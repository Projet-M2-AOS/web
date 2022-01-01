import { User } from "@customTypes/user";
import axios from "axios";

export const getUser = async (userId: string) => {
  return await axios.get<User>("/api/users/" + userId).then((res) => res.data);
};
