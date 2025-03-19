import knex, { Knex } from "knex";
import { User } from "../../entities/users";
import ProfileUser from "../../entities/ProfileUser";
import { convertVisibility } from "../../Modules/post/type";
import { TICanSeePlan, UserICan } from "./type";

export class ICanSeeModel {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async findByUsername(username: string): Promise<UserICan> {
    try {
      return await this.db("users").select("*").where({ username }).first();
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async iCanSeePlan(myId: number, userId: number, privacyUser: string): Promise<TICanSeePlan> {
    try {
      const response = await this.db.transaction(async (db) => {
        let myVisibility = ["*"];

        const isMyProfile = myId == userId;

        const ProfileIsMyFollower = (await db("user_follow_user").where({ follower: userId, following: myId })).length > 0 ? true : false;
        const iFollow = (await db("user_follow_user").where({ follower: myId, following: userId })).length > 0 ? true : false;

        if (isMyProfile) {
          myVisibility = ["*", "onlyFollowers", "onlyIFollow", "followersAndIFollow", "onlyI"];
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

        const icanSee = myVisibility.find((v) => v == privacyUser);

        const response = {
          iCanSeePlan: true,
          iCanShare: true,
        };

        if (icanSee == undefined) {
          response.iCanSeePlan = false;
          response.iCanShare = false;
        }

        if (icanSee != "*") {
          response.iCanShare = false;
        }

        if (isMyProfile) {
          response.iCanSeePlan = true;
          response.iCanShare = true;
        }

        return response;
      });

      return {
        iCanSeePlan: response.iCanSeePlan,
        iCanShare: response.iCanShare,
        userid: 0,
      };
    } catch (e) {
      console.log(e);

      const error = e as Error;
      throw new Error(error.message);
    }
  }
}
