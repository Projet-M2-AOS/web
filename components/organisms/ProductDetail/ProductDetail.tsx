import { Button } from "@components/atoms/Button";
import { Image } from "@components/atoms/Image";
import { CartContext } from "@components/organisms/Cart/context";
import { UpdateProductForm } from "@components/organisms/UpdateProductForm";
import { WishList } from "@components/organisms/WishList";
import { Product } from "@customTypes/product";
import { Role } from "@customTypes/user";
import useClickOutside from "@hooks/useClickOutside";
import { addProductToUserCart } from "@lib/services/user/addProductToUserCart";
import { useSession } from "next-auth/react";
import { FC, useCallback, useContext, useState } from "react";

export type ProductDetailProps = {
  product: Product;
};

export const ProductDetail: FC<ProductDetailProps> = ({ product }) => {
  const { data: session } = useSession();
  const { setShowCart } = useContext(CartContext);
  const [showWishList, setShowWishList] = useState(false);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);

  const displayWishList = useCallback(() => setShowWishList(true), []);
  const hideWishList = useCallback(() => setShowWishList(false), []);

  const displayUpdateProduct = useCallback(
    () => setShowUpdateProduct(true),
    []
  );
  const hideUpdateProduct = useCallback(() => setShowUpdateProduct(false), []);

  const wishListRef = useClickOutside<HTMLDivElement>(() => {
    hideWishList();
  });

  const updateProductRef = useClickOutside<HTMLDivElement>(() => {
    hideUpdateProduct();
  });

  const addToCard = useCallback(() => {
    if (session?.user.id)
      addProductToUserCart(session?.user.id, product._id).then(() =>
        setShowCart(true)
      );
    else alert("Vous n'êtes pas connecté");
  }, [session, product, setShowCart]);

  return (
    <div className="container flex flex-col items-center gap-4 md:items-stretch md:flex-row">
      <div className="w-full md:w-1/3">
        <div className="relative max-w-xs mx-auto overflow-hidden bg-white border rounded-md aspect-square border-neutral-200">
          <Image src={product.imageUrls[0]} alt="" layout="fill" />
        </div>
      </div>
      <div className="space-y-2 md:w-2/3">
        <h1 className="text-2xl">{product.title}</h1>
        <p className="whitespace-pre-line text-neutral-700">
          {product.description}
        </p>
        <div className="text-xl font-semibold text-primary-700">
          {product.price.toFixed(2)}€
        </div>
        <div className="flex flex-wrap pt-1 gap-x-3 gap-y-2">
          <Button onClick={addToCard}>Ajouter au panier</Button>
          <Button variant="secondary" onClick={displayWishList}>
            {"Ajouter à une liste d'envies"}
          </Button>
          {session?.user.role === Role.ADMIN && (
            <Button variant="secondary" onClick={displayUpdateProduct}>
              Modifier le produit
            </Button>
          )}
        </div>
      </div>
      <WishList
        ref={wishListRef}
        productId={product._id}
        hidden={!showWishList}
        onClose={hideWishList}
      />
      <UpdateProductForm
        ref={updateProductRef}
        product={product}
        hidden={!showUpdateProduct}
        onClose={hideUpdateProduct}
      />
    </div>
  );
};
