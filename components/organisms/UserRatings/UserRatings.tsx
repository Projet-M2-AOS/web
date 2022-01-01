import { ListItems } from "@components/atoms/ListItems";
import { FC, useState } from "react";

export const UserRatings: FC = () => {
  const [ratings, setRatings] = useState([]);
  return (
    <ListItems className="w-full max-w-3xl bg-white">
      <h2 className="p-2.5 text-xl text-center">Mes avis</h2>
      {ratings.length === 0 && (
        <p className="p-2.5 text-center font-medium">
          {"Vous n'avez pas noté de produits"}
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
