import { Button } from "@components/atoms/Button";
import classNames from "classnames";
import { Dispatch, FC, SetStateAction, useCallback } from "react";

export type UserPaginationProps = {
  label?: string;
  currentPage: number;
  maxPage: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export const UserPagination: FC<UserPaginationProps> = ({
  label,
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
        <span className={classNames({ "text-neutral-700": currentPage === 0 })}>
          Précédent
        </span>
      </Button>
      <div className="font-semibold">
        {label || `${currentPage + 1}/${maxPage}`}
      </div>
      <Button variant="tertiary" onClick={goNextPage}>
        <span
          className={classNames({
            "text-neutral-700": currentPage === maxPage - 1,
          })}
        >
          Suivant
        </span>
      </Button>
    </div>
  );
};
