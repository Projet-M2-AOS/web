import axios from "axios";

export const deleteProduct = async (productId: string) => {
  return axios.delete("/api/products/" + productId);
};
