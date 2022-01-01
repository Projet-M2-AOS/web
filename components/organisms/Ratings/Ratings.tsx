import { BaseCard } from "@components/atoms/BaseCard";
import { Button } from "@components/atoms/Button";
import { Progress } from "@components/atoms/Progress";
import { RatingValue } from "@components/atoms/RatingValue";
import { ArrowSmRightIcon } from "@heroicons/react/solid";
import useClickOutside from "@hooks/useClickOutside";
import { getProductRatingStats } from "@lib/services/rating/getProductRatingStats";
import { getUserRating } from "@lib/services/rating/getUserRating";
import { useSession } from "next-auth/react";
import { FC, useCallback, useEffect, useState } from "react";
import { Rating, RatingStats } from "types/rating";
import { RatingForm } from "./widgets/RatingForm";

export type RatingsProps = {
  productId: string;
};

export const Ratings: FC<RatingsProps> = ({ productId }) => {
  const { data: session } = useSession();
  const [currentVote, setCurrentVote] = useState<Rating | undefined>();
  const [stats, setStats] = useState<RatingStats>({
    product: productId,
    count: 0,
    average: 0,
    countByRating: {},
  });
  const [showRatingForm, setShowRatingForm] = useState(false);

  const displayRatingForm = useCallback(() => setShowRatingForm(true), []);
  const hideRatingForm = useCallback(() => setShowRatingForm(false), []);

  const RatingFormRef = useClickOutside<HTMLDivElement>(() => {
    hideRatingForm();
  });

  const getCurrentVote = useCallback(() => {
    if (!showRatingForm) {
      if (session?.user.id)
        getUserRating(session.user.id, productId).then(setCurrentVote);
      else alert("Vous n'êtes pas connecté");
    }
  }, [productId, session, showRatingForm]);

  const getStats = useCallback(() => {
    if (!showRatingForm) getProductRatingStats(productId).then(setStats);
  }, [productId, showRatingForm]);

  useEffect(getCurrentVote, [getCurrentVote]);
  useEffect(getStats, [getStats]);

  return (
    <>
      <BaseCard className="divide-y divide-neutral-300/50">
        <div className="pb-3">
          <h2 className="text-xl text-center">Avis des clients</h2>
          <p className="flex items-center justify-center gap-1 mb-1 text-center">
            <span className="text-lg font-semibold text-primary-700">
              {stats.average.toFixed(1)}/5
            </span>
            <span className="text-neutral-700">({stats.count} votes)</span>
          </p>
          <ul>
            {[5, 4, 3, 2, 1].map((value) => {
              const totalVotes = stats.count;
              const nbVotes = stats.countByRating[`${value}star`] || 0;
              const ratio = nbVotes / totalVotes;
              return (
                <li key={value} className="flex items-center gap-2">
                  <RatingValue className="justify-end w-7" value={value} />
                  <Progress className="flex-1" value={ratio} />
                  <span className="block text-right w-9 text-neutral-500">
                    {Math.round(ratio * 100)}%
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pt-2 pb-1">
          <div className="font-semibold text-neutral-900">
            {currentVote ? (
              <span className="flex gap-1">
                {`Vous avez donné`}
                <RatingValue value={currentVote.score} />
                {`au produit`}
              </span>
            ) : (
              "Vous voulez donner votre avis ?"
            )}
          </div>
          <Button
            fontWeight="font-semibold"
            variant="tertiary"
            className="flex items-center gap-0.5"
            onClick={displayRatingForm}
          >
            <span>{currentVote ? "Modifier ma note" : "Noter le produit"}</span>
            <ArrowSmRightIcon className="w-5 h-5" />
          </Button>
        </div>
      </BaseCard>
      <RatingForm
        ref={RatingFormRef}
        productId={productId}
        currentVote={currentVote}
        hidden={!showRatingForm}
        onClose={hideRatingForm}
      />
    </>
  );
};
