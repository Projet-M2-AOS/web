import { CommentProps } from "@components/molecules/Comment";
import { getUser } from "@lib/services/user/getUser";
import axios from "axios";
import { Comment } from "types/comment";

const diffTypes = {
  year: 1000 * 60 * 60 * 24 * 365,
  month: 1000 * 60 * 60 * 24 * 30,
  day: 1000 * 60 * 60 * 24,
  hour: 1000 * 60 * 60,
  minute: 1000 * 60,
  second: 1000,
};

const generateSimpleDateLabel = (date: Date) => {
  const todayTime = new Date().getTime();
  const dateTime = date.getTime();
  const diff = todayTime - dateTime;

  if (diff > diffTypes.year)
    return `il y a ${Math.floor(diff / diffTypes.year)} an${
      diff / diffTypes.year >= 2 ? "s" : ""
    }`;
  if (diff > diffTypes.month)
    return `il y a ${Math.floor(diff / diffTypes.month)} mois`;
  if (diff > diffTypes.day)
    return `il y a ${Math.floor(diff / diffTypes.day)} jour${
      diff / diffTypes.day >= 2 ? "s" : ""
    }`;
  if (diff > diffTypes.hour)
    return `il y a ${Math.floor(diff / diffTypes.hour)} heure${
      diff / diffTypes.hour >= 2 ? "s" : ""
    }`;
  if (diff > diffTypes.minute)
    return `il y a ${Math.floor(diff / diffTypes.minute)} minute${
      diff / diffTypes.minute >= 2 ? "s" : ""
    }`;
  return `il y a ${Math.floor(diff / diffTypes.second)} seconde${
    diff / diffTypes.second >= 2 ? "s" : ""
  }`;
};

export const getComments = async (productId: string) => {
  return axios
    .get<Comment[]>("/api/comments", {
      params: {
        productId,
      },
    })
    .then(({ data }) =>
      Promise.all(
        data.map<Promise<CommentProps>>(async (comment) => ({
          content: comment.description,
          dateLabel: generateSimpleDateLabel(new Date(comment.createDate)),
          name: await getUser(comment.user).then(
            (user) => `${user.firstName} ${user.lastName}`
          ),
        }))
      )
    );
};
