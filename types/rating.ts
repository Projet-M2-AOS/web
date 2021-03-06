import { Product } from "@customTypes/product";
import { User } from "@customTypes/user";

export type Rating = {
  product: string;
  user: string;
  score: number;
  date: string;
  _id: string;
};

export type DetailledRating = {
  product: Product;
  user: User;
  score: number;
  date: string;
  _id: string;
};

export type RatingStats = {
  product: string;
  count: number;
  average: number;
  countByRating: Record<string, number>;
};
