import axios from "axios";
import { Rating } from "types/rating";

export const getUserRating = async (userId: string, productId: string) => {
  return axios
    .get<Rating[]>("/api/ratings", {
      params: {
        userId,
        productId,
      },
    })
    .then(({ data }) => (data.length > 0 ? data[0] : undefined));
};
