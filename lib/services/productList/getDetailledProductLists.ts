import { getProduct } from "@lib/services/product/getProduct";
import { getUser } from "@lib/services/user/getUser";
import axios from "axios";
import { DetailledProductList, ProductList } from "types/productList";

export const getDetailledProductLists = async (
  userId: string,
  start: number,
  end: number
) => {
  return await axios
    .get<ProductList[]>("/api/product-lists")
    .then(async ({ data }) => {
      const productLists = await Promise.all(
        data
          .slice(start, end)
          .map<Promise<DetailledProductList>>(async (productList) => ({
            _id: productList._id,
            name: productList.name,
            user: await getUser(productList.user),
            products: await Promise.all(productList.products.map(getProduct)),
          }))
      );
      return {
        productLists,
        total: data.length,
      };
    });
};
