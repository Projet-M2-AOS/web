import axios from "axios";

export const createComment = async (
  userId: string,
  productId: string,
  comment: string
) => {
  return axios.post(`/api/comments`, [
    { product: productId, user: userId, description: comment },
  ]);
};
