import { Role, User } from "@customTypes/user";
import axios from "axios";

export const updateUserRole = async (userId: string, role: Role) => {
  await axios.put<User[]>("/api/users/" + userId, { role });
};
