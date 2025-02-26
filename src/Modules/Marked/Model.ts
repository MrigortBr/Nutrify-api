import { Knex } from "knex";
import { VisibilityInProfile } from "../_Geral/types";
import { picture } from "../../entities/ProfileUser";

export default class MarkedModel {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async getMarkedPosts(profileId: number, id: number, visibility: VisibilityInProfile): Promise<picture[]> {
    try {
      return this.db.transaction(async (db) => {
        const r: picture[] = await db("post_user_marked")
          .select([
            "post.id",
            "post.picture",
            db.raw("COUNT(DISTINCT post_like.post_id) as likes"),
            db.raw("COUNT(DISTINCT post_comments.post_id) as comments"),
          ])
          .innerJoin("post", "post.id", "post_user_marked.post_id")
          .innerJoin("users", "users.id", "post_user_marked.user_id")
          .leftJoin("post_like", "post.id", "post_like.post_id")
          .leftJoin("post_comments", "post.id", "post_comments.post_id")
          .where("post_user_marked.user_id", profileId)
          .andWhere((builder) => {
            builder.whereIn("users.whoseemyposts", visibility.visibilityComments);
          })
          .andWhere((builder) => {
            builder.whereIn("post.visibility", visibility.visibilityPosts);
          })
          .groupBy("post.id");

        return r;
      });
    } catch (error) {
      console.log(error);

      throw new Error("PE-UNKW");
    }
  }
}
