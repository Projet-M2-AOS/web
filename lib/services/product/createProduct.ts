import { Product } from "@customTypes/product";
import axios from "axios";

export const createProduct = async (
  name: string,
  imageUrl: string,
  price: number,
  description: string
) => {
  return axios
    .post<Product[]>(`/api/products`, [
      {
        imageUrls: [imageUrl],
        title: name,
        description,
        price,
      },
    ])
    .then(({ data }) => data);
};
