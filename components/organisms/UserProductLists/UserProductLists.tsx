import { ListItems } from "@components/atoms/ListItems";
import { UserPagination } from "@components/molecules/UserPagination";
import { UserProductRow } from "@components/molecules/UserProductRow";
import { getDetailledProductLists } from "@lib/services/productList/getDetailledProductLists";
import { useSession } from "next-auth/react";
import { FC, useEffect, useMemo, useState } from "react";
import { DetailledProductList } from "types/productList";

const limit = 1;

export const UserProductLists: FC = () => {
  const { data: session } = useSession();
  const [productLists, setProductLists] = useState<DetailledProductList[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const maxPage = useMemo(() => Math.max(Math.ceil(total / limit), 1), [total]);

  useEffect(() => {
    if (session)
      getDetailledProductLists(
        session.user.id,
        page * limit,
        (page + 1) * limit
      ).then(({ productLists, total }) => {
        setProductLists(productLists);
        setTotal(total);
      });
  }, [page, session]);

  return (
    <ListItems className="w-full max-w-3xl bg-white">
      <h2 className="p-2.5 text-xl text-center">
        Mes listes de produits ({total})
      </h2>
      {productLists.length === 0 ? (
        <p className="p-2.5 text-center font-medium">
          {"Vous n'avez pas de liste de produits"}
        </p>
      ) : (
        <>
          {productLists[0].products.map((product) => (
            <UserProductRow TitleTag="h4" product={product} key={product._id}>
              <p className="text-sm text-neutral-700 lg:text-base">
                {product.description}
              </p>
              <div className="mt-px font-semibold text-primary-700">
                {product.price.toFixed(2)}€
              </div>
            </UserProductRow>
          ))}
          <UserPagination
            currentPage={page}
            maxPage={maxPage}
            setPage={setPage}
            label={productLists[0].name}
          />
        </>
      )}
    </ListItems>
  );
};
