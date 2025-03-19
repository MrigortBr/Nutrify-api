import { Knex } from "knex";
import ProfileUser from "../../entities/ProfileUser";
import { convertVisibility } from "../post/type";
import { SimpleProfile } from "../../entities/SimpleProfile";
import { updateUserPrivacy, UserPrivacy } from "../../entities/ConfigEntity";

export default class ProfileModel {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async findUserByUsername(username: string): Promise<number> {
    try {
      const response = await this.db("users").select("id").where({ username }).first();
      if (!response) throw new Error("FC-E-UNF");
      return response.id;
    } catch (e) {
      const error = e as Error;
      throw new Error(error.message);
    }
  }

  async getProfile(profileId: number, id: number): Promise<ProfileUser> {
    try {
      const response = await this.db.transaction(async (db) => {
        let myVisibility = ["*"];

        const isMyProfile = profileId == id;

        const ProfileIsMyFollower = (await db("user_follow_user").where({ follower: profileId, following: id })).length > 0 ? true : false;
        const iFollow = (await db("user_follow_user").where({ follower: id, following: profileId })).length > 0 ? true : false;

        if (isMyProfile) {
          myVisibility = ["*", "onlyFollowers", "onlyIFollow", "followersAndIFollow", "draft", "archived"];
        }

        if (ProfileIsMyFollower) {
          myVisibility.push(convertVisibility["onlyIFollow"]);
        }

        if (iFollow) {
          myVisibility.push(convertVisibility["onlyFollowers"]);
        }

        if (iFollow && ProfileIsMyFollower) {
          myVisibility.push(convertVisibility["followersAndIFollow"]);
        }

        const r: ProfileUser = await db("users")
          .leftJoin("user_follow_user", "users.id", "user_follow_user.follower")
          .leftJoin("user_follow_user as followers_table", "users.id", "followers_table.following")
          .where("users.id", profileId)
          .select([
            "users.username",
            "users.picture",
            "users.name",
            "users.bio",
            db.raw("COUNT(DISTINCT user_follow_user.following) as following"),
            db.raw("COUNT(DISTINCT followers_table.follower) as followers"),
            db.raw("COUNT(DISTINCT followers_table.follower) as followers"),
          ])
          .groupBy("users.id")
          .first();

        const pictures = await db("post")
          .where("post.user_id", profileId)
          .leftJoin("post_like", "post.id", "post_like.post_id")
          .leftJoin("post_comments", "post.id", "post_comments.post_id")
          .andWhere((builder) => {
            builder.whereIn("post.visibility", myVisibility).orWhereNull("post.id");
          })
          .select([
            "post.id",
            "post.picture",
            db.raw("COUNT(DISTINCT post_like.post_id) as likes"),
            db.raw("COUNT(DISTINCT post_comments.post_id) as comments"),
          ])
          .groupBy("post.id");

        r.pictures = pictures;
        r.iFollow = iFollow;
        r.isMyProfile = isMyProfile;

        return r;
      });

      return response;
    } catch (e) {
      console.log(e);

      const error = e as Error;
      throw new Error(error.message);
    }
  }

  async getSimpleProfile(id: number): Promise<SimpleProfile> {
    try {
      return await this.db("users").select(["name", "username", "picture"]).where({ id }).first();
    } catch (e) {
      const error = e as Error;
      console.log(error);

      throw new Error(error.message);
    }
  }

  async updateUser(profileId: number, profile: ProfileUser) {
    try {
      await this.db("users")
        .update({
          name: profile.name,
          username: profile.username,
          picture: profile.picture,
          bio: profile.bio,
        })
        .where({ id: profileId });
    } catch (e) {
      console.log(e);

      const error = e as Error;

      throw new Error(error.message);
    }
  }

  async getConfigUser(id: number): Promise<UserPrivacy> {
    try {
      return await this.db("users").select(["whosendmessage ", "whoseemyposts ", "whoseemyplanning "]).where({ id }).first();
    } catch (e) {
      const error = e as Error;
      throw new Error(error.message);
    }
  }

  async updateConfigUser(id: number, data: updateUserPrivacy) {
    try {
      return await this.db("users").update(data).where({ id });
    } catch (e) {
      throw new Error("PE-UNKW");
    }
  }
}
