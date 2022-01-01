import { Product } from "types/product";

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
  user: string;
  address: string;
  products: Product[];
  price: number;
  paymentState: string;
};
