import { Button } from "@components/atoms/Button";
import { Image } from "@components/atoms/Image";
import HomeData from "data/HomeData";
import type { FC } from "react";

const Product = HomeData.products[0];

export const ProductDetail: FC = () => {
  return (
    <div className="container flex flex-col items-center gap-4 md:items-stretch md:flex-row">
      <div className="w-full md:w-1/3">
        <div className="relative max-w-xs mx-auto overflow-hidden bg-white border rounded-md shadow-md aspect-square border-neutral-300">
          <Image src={Product.imageUrl} alt="" layout="fill" />
        </div>
      </div>
      <div className="space-y-2 md:w-2/3">
        <h1 className="text-2xl">{Product.title}</h1>
        <p className="text-neutral-700">{Product.description}</p>
        <div className="text-lg font-bold text-primary-700">
          {Product.price.toFixed(2)}€
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-2">
          <Button>Ajouter au panier</Button>
          <Button variant="secondary">{"Ajouter à une liste d'envie"}</Button>
        </div>
      </div>
    </div>
  );
};
