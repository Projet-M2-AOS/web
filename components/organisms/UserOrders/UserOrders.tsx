import { Button } from "@components/atoms/Button";
import { ListItems } from "@components/atoms/ListItems";
import { UserPagination } from "@components/molecules/UserPagination";
import { UserProductRow } from "@components/molecules/UserProductRow";
import { UserGroupIcon, UserIcon } from "@heroicons/react/solid";
import { getDetailledOrders } from "@lib/services/order/getDetailledOrders";
import { useSession } from "next-auth/react";
import { FC, useEffect, useMemo, useState } from "react";
import { DetailledOrder } from "types/order";
import { Role } from "types/user";

const limit = 1;

export const UserOrders: FC = () => {
  const { data: session } = useSession();
  const [toggleMode, setToggleMode] = useState(false);
  const [modeAdmin, setModeAdmin] = useState(false);
  const [orders, setOrders] = useState<DetailledOrder[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const maxPage = useMemo(() => Math.max(Math.ceil(total / limit), 1), [total]);
  const isAdmin = useMemo(
    () => session?.user.role === Role.ADMIN,
    [session?.user.role]
  );

  useEffect(() => {
    if (session && !toggleMode)
      getDetailledOrders(
        modeAdmin ? "" : session.user.id,
        page * limit,
        (page + 1) * limit
      ).then(({ orders, total }) => {
        setOrders(orders);
        setTotal(total);
      });
  }, [page, session, modeAdmin, toggleMode]);

  useEffect(() => {
    if (toggleMode) setModeAdmin((value) => !value);
  }, [toggleMode]);
  useEffect(() => setPage(0), [modeAdmin]);
  useEffect(() => setToggleMode(false), [page]);

  return (
    <ListItems className="relative w-full max-w-3xl bg-white">
      <h2 className="p-2.5 text-xl text-center">
        {modeAdmin
          ? `Toutes les commandes (${total})`
          : `Mes commandes (${total})`}
        {isAdmin && (
          <Button
            padding="p-2"
            className="absolute top-2 right-2"
            variant="secondary"
            onClick={() => setToggleMode(true)}
          >
            {modeAdmin ? (
              <UserIcon className="w-4"></UserIcon>
            ) : (
              <UserGroupIcon className="w-4"></UserGroupIcon>
            )}
          </Button>
        )}
      </h2>
      {orders.length === 0 ? (
        <p className="p-2.5 text-center font-medium">
          {modeAdmin
            ? "Il n'y a aucune commande"
            : "Vous n'avez pas fait de commandes"}
        </p>
      ) : (
        <>
          <div className="p-4">
            <h3 className="text-lg">Commande #{orders[0]._id}</h3>
            {[
              { label: "Prénom :", value: orders[0].user.firstName },
              { label: "Nom de famille :", value: orders[0].user.lastName },
              {
                label: "Numéro de téléphone :",
                value: orders[0].user.phoneNumber,
              },
              { label: "Adresse de livraison :", value: orders[0].address },
              {
                label: "Montant de la commande :",
                value: `${orders[0].price.toString()}€`,
              },
            ].map(({ label, value }) => (
              <div key={label} className="space-x-1">
                <span>{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
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
