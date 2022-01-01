import axios from "axios";

export const deleteComment = async (commentId: string) => {
  return axios.delete("/api/comments/" + commentId);
};
