import { Button } from "@components/atoms/Button";
import { Image } from "@components/atoms/Image";
import { addProductToUserCart } from "@lib/services/addProductToUserCart";
import { useSession } from "next-auth/react";
import { FC, useCallback } from "react";
import { Product } from "types/product";

export type ProductDetailProps = {
  product: Product;
};

export const ProductDetail: FC<ProductDetailProps> = ({ product }) => {
  const { data: session } = useSession();

  const addToCard = useCallback(() => {
    if (session?.user.id) addProductToUserCart(session?.user.id, product._id);
    else alert("Vous n'êtes pas connecté");
  }, [session, product]);

  return (
    <div className="container flex flex-col items-center gap-4 md:items-stretch md:flex-row">
      <div className="w-full md:w-1/3">
        <div className="relative max-w-xs mx-auto overflow-hidden bg-white border rounded-md aspect-square border-neutral-200">
          <Image src={product.imageUrls[0]} alt="" layout="fill" />
        </div>
      </div>
      <div className="space-y-2 md:w-2/3">
        <h1 className="text-2xl">{product.title}</h1>
        <p className="text-neutral-700">{product.description}</p>
        <div className="text-xl font-semibold text-primary-700">
          {product.price.toFixed(2)}€
        </div>
        <div className="flex flex-wrap pt-1 gap-x-3 gap-y-2">
          <Button onClick={addToCard}>Ajouter au panier</Button>
          <Button variant="secondary">{"Ajouter à une liste d'envie"}</Button>
        </div>
      </div>
    </div>
  );
};
