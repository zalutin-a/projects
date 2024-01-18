import { Comment } from "src/shared/index";
import { updateCommentsFunction } from "../../types";

export type commentItemProps = {
  updateComments: updateCommentsFunction,
  comments: Comment[];
  comment: Comment;
  index: number;
}
