import { BaseCard } from "@components/atoms/BaseCard";
import { Image } from "@components/atoms/Image";
import { RatingValue } from "@components/atoms/RatingValue";
import type { FC } from "react";

export type ProductCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  notation: number;
};

export const ProductCard: FC<ProductCardProps> = ({
  title,
  description,
  imageUrl,
  price,
  notation,
}) => {
  return (
    <BaseCard>
      <div className="self-center">
        <Image src={imageUrl} alt="" width={200} height={200} />
      </div>
      <h3 className="line-clamp-1">{title}</h3>
      <p className="text-sm line-clamp-2 text-neutral-500">{description}</p>
      <div className="flex items-center justify-between mt-1 font-bold font-heading">
        <div className="text-primary-700">{`${price.toFixed(2)}€`}</div>
        <RatingValue value={notation} valueFixed={1} />
      </div>
    </BaseCard>
  );
};
