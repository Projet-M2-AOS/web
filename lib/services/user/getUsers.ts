import { User } from "@customTypes/user";
import axios from "axios";

export const getUsers = async () => {
  return await axios.get<User[]>("/api/users").then((res) => res.data);
};
