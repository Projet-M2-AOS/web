import { getProduct } from "@lib/services/product/getProduct";
import { getUser } from "@lib/services/user/getUser";
import axios from "axios";
import { Comment, DetailledComment } from "types/comment";

export const getDetailledComments = async (
  userId: string,
  start: number,
  end: number
) => {
  return axios
    .get<Comment[]>("/api/comments", {
      params: {
        userId,
      },
    })
    .then(async ({ data }) => {
      const comments = await Promise.all(
        data
          .slice(start, end)
          .map<Promise<DetailledComment>>(async (comment) => ({
            _id: comment._id,
            user: await getUser(comment.user),
            product: await getProduct(comment.product),
            description: comment.description,
            createDate: comment.createDate,
            title: comment.title,
            __v: comment.__v,
          }))
      );
      return {
        comments,
        total: data.length,
      };
    });
};
