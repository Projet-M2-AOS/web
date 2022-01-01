import { Product } from "@customTypes/product";
import { User } from "@customTypes/user";

export type Order = {
  _id: string;
  user: string;
  address: string;
  products: string[];
  price: number;
  paymentState: string;
};

export type DetailledOrder = {
  _id: string;
  user: User;
  address: string;
  products: Product[];
  price: number;
  paymentState: string;
};
