import { Knex } from "knex";
import { ListPost } from "../../entities/ListPostDTO";

export default class CommentsModel {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async commentInPost(postId: string, userId: number, comment: string) {
    try {
      await this.db("post_comments").insert({
        post_id: postId,
        user_id: userId,
        comment: comment,
      });
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async getComments(postId: string, page: string, size: string): Promise<ListPost> {
    try {
      const response: ListPost = {
        comments: [],
        nextPage: false,
        page: page,
        iCanComment: false,
        commentsNumber: 0,
      };

      const comments = await this.db("post_comments")
        .select(["users.username", "post_comments.comment", "post_comments.id", "post_comments.created_at"])
        .innerJoin("users", "users.id", "post_comments.user_id")
        .where({ post_id: postId })
        .limit(Number(size))
        .offset(Number(page) * Number(size))
        .orderBy("post_comments.created_at", "desc");
      response.comments = comments;

      const [{ totalComments }] = await this.db("post_comments").where({ post_id: postId }).count("id as totalComments");

      response.commentsNumber = Number(totalComments) ?? 0;

      const r = await this.db("post_comments").where({ post_id: postId }).count<{ total: number }>("id as total").first();
      if (r != undefined) response.nextPage = Number(page) + 10 < Number(r.total);

      return response;
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async deleteMyComment(postId: string, idUser: number, commentId: string) {
    try {
      await this.db("post_comments").delete().where({ post_id: postId, user_id: idUser, id: commentId });
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }
}
