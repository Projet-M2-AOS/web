import { ListItems } from "@components/atoms/ListItems";
import { Comment, CommentProps } from "@components/molecules/Comment";
import { getComments } from "@lib/services/comment/getComments";
import { FC, useCallback, useEffect, useState } from "react";

export type DisplayCommentsProps = {
  productId: string;
};

export const DisplayComments: FC<DisplayCommentsProps> = ({ productId }) => {
  const [comments, setComments] = useState<CommentProps[]>([]);

  const searchComment = useCallback(() => {
    getComments(productId).then(setComments);
  }, [productId]);

  useEffect(searchComment, [searchComment]);

  return (
    <ListItems className="bg-white">
      <h2 className="p-2.5 text-xl text-center">Commentaires des clients</h2>
      {comments.length === 0 && (
        <p className="p-2.5 text-center font-medium">
          Aucun commentaire pour ce produit
        </p>
      )}
      {comments.map((comment, index) => (
        <Comment key={index} {...comment} />
      ))}
    </ListItems>
  );
};
