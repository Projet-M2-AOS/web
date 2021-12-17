import { BaseCard } from "@components/atoms/BaseCard";
import { Progress } from "@components/atoms/Progress";
import { RatingValue } from "@components/atoms/RatingValue";
import type { FC } from "react";

export const Ratings: FC = () => {
  return (
    <BaseCard>
      <h2 className="text-lg text-center">Avis des clients</h2>
      <div className="mb-1 text-center">4,4/5 (24 votes)</div>
      <ul>
        {[5, 4, 3, 2, 1].map((value) => (
          <li key={value} className="flex items-center gap-2">
            <RatingValue
              className="justify-start w-7"
              value={value}
              reverseOrder
            />
            <Progress className="flex-1" value={value / 10} />
            <span className="block text-right w-9">{value}0%</span>
          </li>
        ))}
      </ul>
    </BaseCard>
  );
};
