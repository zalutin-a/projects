import { Comment } from "src/shared/index";
import { commentActionFunction } from "../../types";

export type commentItemProps = {
  onAction: commentActionFunction,
  comments: Comment[];
  comment: Comment;
  index: number;
}
