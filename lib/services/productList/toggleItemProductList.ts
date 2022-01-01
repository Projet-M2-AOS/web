import { ProductList } from "@customTypes/productList";
import axios from "axios";

export const toggleItemProductList = async (
  userId: string,
  listId: string,
  productId: string
) => {
  const productLists = await axios
    .get<ProductList[]>("/api/product-lists")
    .then((res) => res.data);

  const productList = productLists.find((e) => e._id === listId);
  if (productList) {
    const newProducts = productList.products;
    if (newProducts.includes(productId))
      newProducts.splice(newProducts.findIndex((e) => e === productId));
    else newProducts.push(productId);

    return axios.put("/api/product-lists/" + listId, {
      products: newProducts,
    });
  }
};
