import axios from "axios";

export const createProductList = async (userId: string, name: string) => {
  return axios.post("/api/product-lists", [
    {
      user: userId,
      name,
      products: [],
    },
  ]);
};
