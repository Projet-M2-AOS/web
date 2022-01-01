import { getProduct } from "@lib/services/product/getProduct";
import { getUser } from "@lib/services/user/getUser";
import axios from "axios";
import { DetailledRating, Rating } from "types/rating";

export const getDetailledRatings = async (
  userId: string,
  start: number,
  end: number
) => {
  return axios
    .get<Rating[]>("/api/ratings", {
      params: {
        userId,
      },
    })
    .then(async ({ data }) => {
      const ratings = await Promise.all(
        data
          .slice(start, end)
          .map<Promise<DetailledRating>>(async (rating) => ({
            _id: rating._id,
            user: await getUser(rating.user),
            product: await getProduct(rating.product),
            score: rating.score,
            date: rating.date,
          }))
      );
      return {
        ratings,
        total: data.length,
      };
    });
};
