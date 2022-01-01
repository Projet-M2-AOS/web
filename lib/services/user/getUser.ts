import axios from "axios";
import { User } from "types/user";

export const getUser = async (userId: string) => {
  return await axios.get<User>("/api/users/" + userId).then((res) => res.data);
};
