import { Image } from "@components/atoms/Image";
import { Link } from "@components/atoms/Link";
import type { FC } from "react";
import { Product } from "types/product";

export type UserProductRowProps = {
  product: Product;
};

export const UserProductRow: FC<UserProductRowProps> = ({
  product,
  children,
}) => {
  return (
    <Link href={"/products/" + product._id} className="flex gap-4 p-4">
      <div className="self-center flex-shrink-0 w-20">
        <div className="relative w-full mx-auto overflow-hidden bg-white border rounded-md aspect-square border-neutral-200">
          <Image src={product.imageUrls[0]} alt="" layout="fill" />
        </div>
      </div>
      <div>
        <h3>{product.title}</h3>
        {children}
      </div>
    </Link>
  );
};
