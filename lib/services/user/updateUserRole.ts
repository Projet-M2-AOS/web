import axios from "axios";
import { Role, User } from "types/user";

export const updateUserRole = async (userId: string, role: Role) => {
  await axios.put<User[]>("/api/users/" + userId, { role });
};
