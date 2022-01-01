import { Button } from "@components/atoms/Button";
import { Role } from "@customTypes/user";
import { XIcon } from "@heroicons/react/solid";
import { deleteComment } from "@lib/services/comment/deleteComment";
import { useSession } from "next-auth/react";
import { FC, useCallback, useMemo } from "react";

export type CommentProps = {
  commentId: string;
  userId: string;
  name: string;
  dateLabel: string;
  content: string;
  refresh?: () => void;
};

export const Comment: FC<CommentProps> = ({
  commentId,
  name,
  dateLabel,
  content,
  userId,
  refresh,
}) => {
  const { data: session } = useSession();

  const canDelete = useMemo(
    () => session?.user.role === Role.ADMIN || session?.user.id === userId,
    [session, userId]
  );

  const onClickDelete = useCallback(() => {
    deleteComment(commentId).then(refresh);
  }, [commentId, refresh]);

  return (
    <div className="relative px-5 pt-3 pb-3 bg-white">
      <div className="mb-0.5 space-x-2 pr-8">
        <span className="font-semibold cursor-pointer text-neutral-900">
          {name}
        </span>
        <time className="text-sm text-neutral-500">{dateLabel}</time>
      </div>
      <p className="text-neutral-900">{content}</p>
      {canDelete && (
        <Button className="absolute w-6 h-6 top-3.5 right-6" variant="tertiary">
          <XIcon onClick={onClickDelete} />
        </Button>
      )}
    </div>
  );
};
