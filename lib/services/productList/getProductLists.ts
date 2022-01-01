import axios from "axios";
import { ProductList } from "types/productList";

export const getProductLists = async () => {
  return await axios
    .get<ProductList[]>("/api/product-lists")
    .then((res) => res.data);
};
