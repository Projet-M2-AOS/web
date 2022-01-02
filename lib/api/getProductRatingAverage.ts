import { Rating } from "@customTypes/rating";
import axios from "axios";

export const getProductRatingAverage = async (productId: string) => {
  return await axios
    .get<Rating[]>(process.env.NEXT_PUBLIC_GATEWAY_URL + "/ratings", {
      params: {
        productId,
      },
    })
    .then(
      ({ data }) =>
        data.reduce((total, { score }) => total + score, 0) / data.length || 0
    );
};
