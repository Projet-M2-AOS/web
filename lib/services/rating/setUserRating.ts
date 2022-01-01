import { getUserRating } from "@lib/services/rating/getUserRating";
import axios from "axios";

export const setUserRating = async (
  userId: string,
  productId: string,
  rating?: number
) => {
  const currentUserRating = await getUserRating(userId, productId);
  if (!currentUserRating && rating) {
    return axios.post("/api/ratings", [
      {
        user: userId,
        product: productId,
        score: rating,
      },
    ]);
  } else if (currentUserRating) {
    if (!rating) return axios.delete("/api/ratings/" + currentUserRating._id);
    else
      return axios.put("/api/ratings/" + currentUserRating._id, {
        score: rating,
      });
  } else return Promise.resolve();
};
