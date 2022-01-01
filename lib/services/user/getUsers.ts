import axios from "axios";
import { User } from "types/user";

export const getUsers = async () => {
  return await axios.get<User[]>("/api/users").then((res) => res.data);
};
