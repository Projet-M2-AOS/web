export type User = {
  _id: string;
  role: "USER" | "ADMIN";
  password: string;
  shoppingCart: string[];
  address: string;
  mail: string;
  phoneNumber: string;
  birthDate: string;
  lastName: string;
  firstName: string;
};
