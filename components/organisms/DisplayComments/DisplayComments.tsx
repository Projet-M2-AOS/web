import { Button } from "@components/atoms/Button";
import { ListItems } from "@components/atoms/ListItems";
import { TextAreaInput } from "@components/atoms/TextAreaInput";
import { Comment, CommentProps } from "@components/molecules/Comment";
import { createComment } from "@lib/services/comment/createComment";
import { getComments } from "@lib/services/comment/getComments";
import { useForm } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { FC, useCallback, useEffect, useState } from "react";

export type DisplayCommentsProps = {
  productId: string;
};

export const DisplayComments: FC<DisplayCommentsProps> = ({ productId }) => {
  const { data: session } = useSession();
  const form = useForm({
    initialValues: {
      comment: "",
    },
    validationRules: {
      comment: (value) => value.length > 0,
    },
  });
  const [comments, setComments] = useState<CommentProps[]>([]);

  const searchComment = useCallback(() => {
    getComments(productId).then(setComments);
  }, [productId]);

  useEffect(searchComment, [searchComment]);

  const addComment = useCallback(
    (comment: string) => {
      if (session?.user.id)
        createComment(session.user.id, productId, comment).then(searchComment);
      else alert("Vous n'êtes pas connecté");
    },
    [session, productId, searchComment]
  );

  return (
    <ListItems className="bg-white">
      <h2 className="p-2.5 text-xl text-center">Commentaires des clients</h2>
      {comments.length === 0 && (
        <p className="p-2.5 text-center font-medium">
          Aucun commentaire pour ce produit
        </p>
      )}
      {comments.map((comment, index) => (
        <Comment key={index} refresh={searchComment} {...comment} />
      ))}
      <form
        className="p-4 space-y-2"
        onSubmit={form.onSubmit(({ comment }) => {
          addComment(comment);
          form.reset();
        })}
      >
        <TextAreaInput
          label="Ajouter un commentaire"
          className="mt-0.5"
          error={Boolean(form.errors.comment)}
          value={form.values.comment}
          onChange={(e) => form.setFieldValue("comment", e.currentTarget.value)}
        />
        <div className="flex">
          <Button type="submit">Valider</Button>
        </div>
      </form>
    </ListItems>
  );
};
