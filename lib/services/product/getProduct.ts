import { Product } from "@customTypes/product";
import axios from "axios";

export const getProduct = async (productId: string) => {
  return await axios
    .get<Product>("/api/products/" + productId)
    .then((res) => res.data);
};
