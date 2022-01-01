import type { FC } from "react";

export type CommentProps = {
  name: string;
  dateLabel: string;
  content: string;
};

export const Comment: FC<CommentProps> = ({ name, dateLabel, content }) => {
  return (
    <div className="px-5 pt-3 pb-3 bg-white">
      <div className="mb-0.5 space-x-2">
        <span className="font-semibold cursor-pointer text-neutral-900">
          {name}
        </span>
        <time className="text-sm text-neutral-500">{dateLabel}</time>
      </div>
      <p className="text-neutral-900">{content}</p>
    </div>
  );
};
