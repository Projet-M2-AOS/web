import { ProductList } from "@customTypes/productList";
import axios from "axios";

export const getProductLists = async () => {
  return await axios
    .get<ProductList[]>("/api/product-lists")
    .then((res) => res.data);
};
