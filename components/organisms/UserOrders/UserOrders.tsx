import { ListItems } from "@components/atoms/ListItems";
import { FC, useState } from "react";

export const UserOrders: FC = () => {
  const [orders, setOrders] = useState([]);
  return (
    <ListItems className="w-full max-w-3xl bg-white">
      <h2 className="p-2.5 text-xl text-center">Mes commandes</h2>
      {orders.length === 0 && (
        <p className="p-2.5 text-center font-medium">
          {"Vous n'avez pas fait de commandes"}
        </p>
      )}
      {/*
      {comments.map((comment, index) => (
        <Comment key={index} refresh={searchComment} {...comment} />
      ))}
      */}
    </ListItems>
  );
};
