import { ListItems } from "@components/atoms/ListItems";
import { UserPagination } from "@components/molecules/UserPagination";
import { UserProductRow } from "@components/molecules/UserProductRow";
import { getDetailledComments } from "@lib/services/comment/getDetailledComments";
import { useSession } from "next-auth/react";
import { FC, useEffect, useMemo, useState } from "react";
import { DetailledComment } from "types/comment";

const limit = 10;

export const UserComments: FC = () => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<DetailledComment[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const maxPage = useMemo(() => Math.max(Math.ceil(total / limit), 1), [total]);

  useEffect(() => {
    if (session)
      getDetailledComments(
        session.user.id,
        page * limit,
        (page + 1) * limit
      ).then(({ comments, total }) => {
        setComments(comments);
        setTotal(total);
      });
  }, [page, session]);

  return (
    <ListItems className="w-full max-w-3xl bg-white">
      <h2 className="p-2.5 text-xl text-center">Mes commentaires ({total})</h2>
      {comments.length === 0 && (
        <p className="p-2.5 text-center font-medium">
          {"Vous n'avez pas posté de commentaires"}
        </p>
      )}
      {comments.map((comment) => (
        <UserProductRow product={comment.product} key={comment._id}>
          <p>{comment.description}</p>
        </UserProductRow>
      ))}
      <UserPagination currentPage={page} maxPage={maxPage} setPage={setPage} />
    </ListItems>
  );
};
