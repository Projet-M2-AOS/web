import { BaseCard } from "@components/atoms/BaseCard";
import { Button } from "@components/atoms/Button";
import { Progress } from "@components/atoms/Progress";
import { RatingValue } from "@components/atoms/RatingValue";
import { ArrowSmRightIcon } from "@heroicons/react/solid";
import type { FC } from "react";

export const Ratings: FC = () => {
  return (
    <BaseCard className="divide-y divide-neutral-300/50">
      <div className="pb-3">
        <h2 className="text-xl text-center">Avis des clients</h2>
        <p className="flex items-center justify-center gap-1 mb-1 text-center">
          <span className="text-lg font-semibold text-primary-700">4.4/5 </span>
          <span className="text-neutral-700">(24 votes)</span>
        </p>
        <ul>
          {[5, 4, 3, 2, 1].map((value) => (
            <li key={value} className="flex items-center gap-2">
              <RatingValue className="justify-end w-7" value={value} />
              <Progress className="flex-1" value={value / 10} />
              <span className="block text-right w-9 text-neutral-500">
                {value}0%
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-2 pb-1">
        <p className="font-semibold text-neutral-900">
          Vous voulez donner votre avis ?
        </p>
        <Button
          fontWeight="font-semibold"
          variant="tertiary"
          className="flex items-center gap-0.5"
        >
          <span>Noter le produit</span>
          <ArrowSmRightIcon className="w-5 h-5" />
        </Button>
      </div>
    </BaseCard>
  );
};
