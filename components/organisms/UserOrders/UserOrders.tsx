import { IconLabel } from "@components/atoms/IconLabel";
import { ListItems } from "@components/atoms/ListItems";
import { UserPagination } from "@components/molecules/UserPagination";
import { UserProductRow } from "@components/molecules/UserProductRow";
import { CurrencyEuroIcon, HomeIcon } from "@heroicons/react/outline";
import { getDetailledOrders } from "@lib/services/order/getDetailledOrders";
import { useSession } from "next-auth/react";
import { FC, useEffect, useMemo, useState } from "react";
import { DetailledOrder } from "types/order";

const limit = 1;

export const UserOrders: FC = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<DetailledOrder[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const maxPage = useMemo(() => Math.max(Math.ceil(total / limit), 1), [total]);

  useEffect(() => {
    if (session)
      getDetailledOrders(
        session.user.id,
        page * limit,
        (page + 1) * limit
      ).then(({ orders, total }) => {
        setOrders(orders);
        setTotal(total);
      });
  }, [page, session]);

  return (
    <ListItems className="w-full max-w-3xl bg-white">
      <h2 className="p-2.5 text-xl text-center">Mes commandes ({total})</h2>
      {orders.length === 0 ? (
        <p className="p-2.5 text-center font-medium">
          {"Vous n'avez pas fait de commandes"}
        </p>
      ) : (
        <>
          <div className="p-4">
            <h3 className="text-lg">Commande #{total - page}</h3>
            <div className="space-x-1">
              <span className="">Adresse de livraison :</span>
              <span className="font-medium">{orders[0].address}</span>
            </div>
            <div className="space-x-1">
              <span className="">Montant de la commande :</span>
              <span className="font-medium">{orders[0].price.toString()}€</span>
            </div>
          </div>
          {orders[0].products.map((product, index) => (
            <UserProductRow
              TitleTag="h4"
              product={product}
              key={product._id + index.toString()}
            >
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
          />
        </>
      )}
    </ListItems>
  );
};
