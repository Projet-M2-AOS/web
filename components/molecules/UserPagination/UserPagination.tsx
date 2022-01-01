import { Button } from "@components/atoms/Button";
import { Dispatch, FC, SetStateAction, useCallback } from "react";

export type UserPaginationProps = {
  currentPage: number;
  maxPage: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export const UserPagination: FC<UserPaginationProps> = ({
  currentPage,
  maxPage,
  setPage,
}) => {
  const goNextPage = useCallback(() => {
    setPage((page) => Math.min(page + 1, maxPage - 1));
  }, [maxPage, setPage]);

  const goPrevPage = useCallback(() => {
    setPage((page) => Math.max(page - 1, 0));
  }, [setPage]);

  return (
    <div className="flex justify-between px-3 py-3">
      <Button variant="tertiary" onClick={goPrevPage}>
        Précédent
      </Button>
      <div className="font-semibold">
        {currentPage + 1}/{maxPage}
      </div>
      <Button variant="tertiary" onClick={goNextPage}>
        Suivant
      </Button>
    </div>
  );
};
