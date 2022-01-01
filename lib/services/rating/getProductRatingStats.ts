import { Rating, RatingStats } from "@customTypes/rating";
import axios from "axios";

export const getProductRatingStats = async (productId: string) => {
  return await axios
    .get<Rating[]>("/api/ratings", {
      params: {
        productId,
      },
    })
    .then(({ data }) =>
      data.reduce<RatingStats>(
        (stats, { score }) => {
          stats.count++;
          stats.average += score / data.length;
          if (!stats.countByRating[`${score}star`])
            stats.countByRating[`${score}star`] = 0;
          stats.countByRating[`${score}star`]++;

          return stats;
        },
        {
          product: productId,
          count: 0,
          average: 0,
          countByRating: {},
        }
      )
    );
};
