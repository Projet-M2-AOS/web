import axios from "axios";
import { Product } from "types/product";

export const getProduct = async (productId: string) => {
  return await axios
    .get<Product>("/api/products/" + productId)
    .then((res) => res.data);
};
