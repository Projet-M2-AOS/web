import { Product } from "@customTypes/product";
import { User } from "@customTypes/user";

export type ProductList = {
  _id: string;
  user: string;
  name: string;
  products: string[];
};

export type DetailledProductList = {
  _id: string;
  user: User;
  name: string;
  products: Product[];
};
