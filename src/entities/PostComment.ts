export default class PostLike {
  id: number;
  userId: number;
  postId: number;
  comment: string;
  createdAt: Date;

  constructor(id: number, userId: number, postId: number, comment: string, createdAt: Date) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
    this.comment = comment;
    this.createdAt = createdAt;
  }
}
