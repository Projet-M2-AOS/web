import { Image } from "@components/atoms/Image";
import { Link } from "@components/atoms/Link";
import { ListItems } from "@components/atoms/ListItems";
import { UserPagination } from "@components/molecules/UserPagination";
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
        <Link
          href={"/products/" + comment.product._id}
          className="flex gap-4 p-4"
          key={comment._id}
        >
          <div className="self-center flex-shrink-0 w-20">
            <div className="relative w-full mx-auto overflow-hidden bg-white border rounded-md aspect-square border-neutral-200">
              <Image src={comment.product.imageUrls[0]} alt="" layout="fill" />
            </div>
          </div>
          <div>
            <h3>{comment.product.title}</h3>
            <p>{comment.description}</p>
          </div>
        </Link>
      ))}
      <UserPagination currentPage={page} maxPage={maxPage} setPage={setPage} />
    </ListItems>
  );
};
