export default class PostLike {
  userId: number;
  postId: number;
  createdAt: Date;

  constructor(userId: number, postId: number, createdAt: Date) {
    this.userId = userId;
    this.postId = postId;
    this.createdAt = createdAt;
  }
}
