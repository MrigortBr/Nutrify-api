import { PublishData } from "../Modules/post/type";

export class PostMarked {
  id: number | undefined;
  user_id: number;
  post_id: number;
  status: "marked" | "requested";
  created_at: Date | undefined;

  constructor(id: number | undefined, userId: number, postId: number, status: "marked" | "requested", createdAt: Date | undefined) {
    this.id = id;
    this.user_id = userId;
    this.post_id = postId;
    this.status = status;
    this.created_at = createdAt;
  }

  static create(userId: number, postId: number, status: "marked" | "requested" = "marked") {
    return new PostMarked(undefined, userId, postId, status, undefined);
  }
}
