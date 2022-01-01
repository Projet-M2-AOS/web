import { Product } from "@customTypes/product";
import { User } from "@customTypes/user";

export type Comment = {
  _id: string;
  createDate: string;
  description: string;
  title: string;
  product: string;
  user: string;
  __v: number;
};

export type DetailledComment = {
  _id: string;
  createDate: string;
  description: string;
  title: string;
  product: Product;
  user: User;
  __v: number;
};
