import { Knex } from "knex";
import { SimplePost } from "../../entities/SimplePost";
import { iCanInPost } from "../_Geral/types";
import GeralService from "../_Geral/Service";

export default class HomeModel {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async getHome(id: number) {
    try {
      return this.db.transaction(async (db) => {
        let myVisibility = ["*"];

        let r: SimplePost[] = await db("post")
          .select([
            "users.picture as pictureUser",
            "users.username",
            "post.id",
            "post.picture",
            "post.caption",
            db.raw("BOOL_OR(post_like.user_id = ?)::BOOLEAN as iLike", [id]),
            db.raw("COUNT(DISTINCT post_like.post_id) as likes"),
            db.raw("COUNT(post_comments.post_id) as commentsNumber"),
          ])
          .leftJoin("users", "users.id", "post.user_id")
          .leftJoin("post_like", "post.id", "post_like.post_id")
          .leftJoin("post_comments", "post.id", "post_comments.post_id")
          .andWhere((builder) => {
            builder.whereIn("users.whoseemyposts", myVisibility);
          })
          .andWhere((builder) => {
            builder.whereIn("post.visibility", myVisibility);
          })
          .groupBy(["post.id", "users.picture", "users.username", "post.picture", "post.caption"])
          .orderBy("post.created_at", "desc");

        return r;
      });
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }
}
