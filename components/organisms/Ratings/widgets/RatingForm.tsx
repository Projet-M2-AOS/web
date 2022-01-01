import { Button } from "@components/atoms/Button";
import { RatingValue } from "@components/atoms/RatingValue";
import { Drawer } from "@components/molecules/Drawer";
import { Rating } from "@customTypes/rating";
import { setUserRating } from "@lib/services/rating/setUserRating";
import { useForm } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { forwardRef, useCallback, useEffect } from "react";

export type RatingFormProps = {
  productId: string;
  currentVote?: Rating;
  hidden?: boolean;
  onClose?: () => void;
};

export const RatingForm = forwardRef<HTMLDivElement, RatingFormProps>(
  ({ currentVote, hidden, onClose, productId }, ref) => {
    const form = useForm<{ rating?: number }>({
      initialValues: {
        rating: currentVote?.score,
      },
      validationRules: {},
    });
    const { data: session } = useSession();

    const updateRating = useCallback(
      (rating?: number) => {
        if (session?.user.id)
          setUserRating(session.user.id, productId, rating).then(onClose);
        else alert("Vous n'êtes pas connecté");
      },
      [onClose, productId, session]
    );

    const setRatingValue = useCallback(
      (value: number) => {
        if (form.values.rating !== value) form.setFieldValue("rating", value);
        else form.setFieldValue("rating", undefined);
      },
      [form]
    );

    useEffect(() => {
      if (hidden && form.values.rating !== currentVote?.score)
        form.setFieldValue("rating", currentVote?.score);
    }, [currentVote, form, hidden]);

    return (
      <Drawer ref={ref} hidden={hidden} onClose={onClose} title="Mon Avis">
        <form
          className="px-3 py-3 space-y-3"
          onSubmit={form.onSubmit(({ rating }) => {
            updateRating(rating);
          })}
        >
          <div className="flex gap-2">
            <Button
              className="flex justify-center flex-1"
              padding="py-3"
              variant={form.values.rating === 1 ? "primary" : "secondary"}
              onClick={() => setRatingValue(1)}
            >
              <RatingValue value={1} />
            </Button>
            <Button
              className="flex justify-center flex-1"
              padding="py-3"
              variant={form.values.rating === 2 ? "primary" : "secondary"}
              onClick={() => setRatingValue(2)}
            >
              <RatingValue value={2} />
            </Button>
            <Button
              className="flex justify-center flex-1"
              padding="py-3"
              variant={form.values.rating === 3 ? "primary" : "secondary"}
              onClick={() => setRatingValue(3)}
            >
              <RatingValue value={3} />
            </Button>
            <Button
              className="flex justify-center flex-1"
              padding="py-3"
              variant={form.values.rating === 4 ? "primary" : "secondary"}
              onClick={() => setRatingValue(4)}
            >
              <RatingValue value={4} />
            </Button>
            <Button
              className="flex justify-center flex-1"
              padding="py-3"
              variant={form.values.rating === 5 ? "primary" : "secondary"}
              onClick={() => setRatingValue(5)}
            >
              <RatingValue value={5} />
            </Button>
          </div>
          <Button padding="px-3 py-2" widthFull type="submit">
            Noter le produit
          </Button>
        </form>
      </Drawer>
    );
  }
);

RatingForm.displayName = "RatingForm";
