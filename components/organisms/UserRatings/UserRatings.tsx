import { ListItems } from "@components/atoms/ListItems";
import { RatingValue } from "@components/atoms/RatingValue";
import { UserPagination } from "@components/molecules/UserPagination";
import { UserProductRow } from "@components/molecules/UserProductRow";
import { DetailledRating } from "@customTypes/rating";
import { getDetailledRatings } from "@lib/services/rating/getDetailledRatings";
import { useSession } from "next-auth/react";
import { FC, useEffect, useMemo, useState } from "react";

const limit = 10;

export const UserRatings: FC = () => {
  const { data: session } = useSession();
  const [ratings, setRatings] = useState<DetailledRating[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const maxPage = useMemo(() => Math.max(Math.ceil(total / limit), 1), [total]);

  useEffect(() => {
    if (session)
      getDetailledRatings(
        session.user.id,
        page * limit,
        (page + 1) * limit
      ).then(({ ratings, total }) => {
        setRatings(ratings);
        setTotal(total);
      });
  }, [page, session]);

  return (
    <ListItems className="w-full max-w-3xl bg-white">
      <h2 className="p-2.5 text-xl text-center">Mes avis ({total})</h2>
      {ratings.length === 0 && (
        <p className="p-2.5 text-center font-medium">
          {"Vous n'avez pas noté de produits"}
        </p>
      )}
      {ratings.map((rating) => (
        <UserProductRow product={rating.product} key={rating._id}>
          <time className="text-neutral-700">
            le {new Date(rating.date).toLocaleDateString()}
          </time>
          <RatingValue value={rating.score} />
        </UserProductRow>
      ))}

      <UserPagination currentPage={page} maxPage={maxPage} setPage={setPage} />
    </ListItems>
  );
};
