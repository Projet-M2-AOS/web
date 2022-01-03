import axios from "axios";

export const updateProduct = async (
  productId: string,
  name: string,
  imageUrl: string,
  price: number,
  description: string
) => {
  return axios.put(`/api/products/${productId}`, {
    imageUrls: [imageUrl],
    title: name,
    description,
    price,
  });
};
