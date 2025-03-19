import { Knex } from "knex";
import { convertVisibility } from "../post/type";
import { iCanInPost, VisibilityInProfile } from "./types";

export default class GeralModel {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async getIdsByUsername(username: string[]): Promise<number[]> {
    try {
      const r: { id: number }[] = await this.db("users").select("id").whereIn("username", username);

      if (r.length == 0) {
        throw new Error("GC-E-UNF");
      }

      return r.map((e) => e.id);
    } catch (error: any) {
      if (error.message === "GC-E-UNF") {
        throw new Error("GC-E-UNF");
      }

      throw new Error("PE-UNKW");
    }
  }

  async userCanViewAndCanComment(postId: string, userId: number): Promise<iCanInPost> {
    try {
      const response: iCanInPost = {
        iCanComment: false,
        iCanSee: false,
      };

      let myVisibility = ["*"];
      const user: { user_id: number } = await this.db("post").select("user_id").where({ id: postId }).first();

      if (!user) throw new Error("GC-E-PNE");

      const user_id = user.user_id;

      const isMyProfile = user_id == userId;

      const ProfileIsMyFollower =
        (await this.db("user_follow_user").where({ follower: user_id, following: userId })).length > 0 ? true : false;

      const iFollow = (await this.db("user_follow_user").where({ follower: userId, following: user_id })).length > 0 ? true : false;

      if (isMyProfile) {
        myVisibility = ["*", "onlyFallowers", "onlyIFallow", "fallowersAndIFallow", "draft", "archived"];
      } else if (ProfileIsMyFollower) {
        myVisibility.push(convertVisibility["onlyIFallow"]);
      } else if (iFollow) {
        myVisibility.push(convertVisibility["onlyFallowers"]);
      } else if (iFollow && ProfileIsMyFollower) {
        myVisibility.push(convertVisibility["fallowersAndIFallow"]);
      }

      const { post_commentable, visibility, whoseemyposts } = await this.db("post")
        .select(["post.post_commentable", "post.visibility", "users.whoseemyposts"])
        .innerJoin("users", "post.user_id", "users.id")
        .where("post.id", postId)
        .first();

      response.iCanSee =
        myVisibility.find((v, i) => v == visibility) != undefined && myVisibility.find((v, i) => v == whoseemyposts) != undefined;
      response.iCanComment = myVisibility.find((v, i) => v == post_commentable) != undefined;

      if (!response.iCanSee) throw new Error("GC-E-UNS");

      return response;
    } catch (error: any) {
      if (error.message === "GC-E-PNE") {
        throw new Error("GC-E-PNE");
      } else if (error.message === "GC-E-UNS") {
        throw new Error("GC-E-UNS");
      }

      throw new Error("PE-UNKW");
    }
  }

  async getVisibilityForProfile(profileId: number, id: number): Promise<VisibilityInProfile> {
    try {
      return this.db.transaction(async (db) => {
        let myVisibility: string[] = ["*"];
        let myVisibilityUser: string[] = ["*"];

        const isMyProfile = profileId == id;

        const ProfileIsMyFollower = (await db("user_follow_user").where({ follower: profileId, following: id })).length > 0 ? true : false;
        const iFollow = (await db("user_follow_user").where({ follower: id, following: profileId })).length > 0 ? true : false;

        if (isMyProfile) {
          myVisibility = ["*", "onlyFollowers", "onlyIFollow", "followersAndIFollow", "draft", "archived"];
          myVisibilityUser = ["*", "onlyFollowers", "onlyIFollow", "followersAndIFollow"];
        }

        if (ProfileIsMyFollower) {
          myVisibility.push(convertVisibility["onlyIFollow"]);
          myVisibilityUser.push(convertVisibility["onlyIFollow"]);
        }

        if (iFollow) {
          myVisibility.push(convertVisibility["onlyFollowers"]);
          myVisibilityUser.push(convertVisibility["onlyIFollow"]);
        }

        if (iFollow && ProfileIsMyFollower) {
          myVisibility.push(convertVisibility["followersAndIFollow"]);
          myVisibilityUser.push(convertVisibility["followersAndIFollow"]);
        }

        return {
          visibilityPosts: myVisibility,
          visibilityComments: myVisibilityUser,
        } as VisibilityInProfile;
      });
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }
}
