import { Product } from "types/product";

export type ProductList = {
  _id: string;
  user: string;
  name: string;
  products: string[];
};

export type DetailledProductList = {
  _id: string;
  user: string;
  name: string;
  products: Product[];
};
