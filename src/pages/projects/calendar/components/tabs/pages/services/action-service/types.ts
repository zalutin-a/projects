import { Comment } from "src/shared/index"

export type commentParams<C = Comment> = {
  pageId: string,
  comment: C,
}
