import { BaseCard } from "@components/atoms/BaseCard";
import { Image } from "@components/atoms/Image";
import type { FC } from "react";

export type ImageCardProps = {
  title: string;
  imageUrl: string;
};

export const ImageCard: FC<ImageCardProps> = ({ imageUrl, title }) => {
  return (
    <BaseCard>
      <div className="self-center">
        <Image src={imageUrl} alt="" width={200} height={200} />
      </div>
      <h3 className="text-lg text-center">{title}</h3>
    </BaseCard>
  );
};
