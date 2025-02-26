import { Knex } from "knex";
import { convertVisibility, PublishData, PublishDataToSend } from "./type";
import { PostMarked } from "../../entities/PostMarked";
import { Post, updatePost } from "../../entities/Post";
import { comments, SimplePost } from "../../entities/SimplePost";
import { picture } from "../../entities/ProfileUser";

function getHashTags(data: string): string[] {
  return data.split("#").splice(1);
}

export default class PostModel {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async getUserByUsername(username: string[]) {
    try {
      return await this.db("users").select("id").whereIn("username", username);
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async insertPostAndMarked(data: PublishData, userId: number) {
    try {
      return await this.db.transaction(async (db) => {
        const postAdd: PublishDataToSend = {
          caption: data.caption,
          picture: data.image,
          post_commentable: data.canComment,
          visibility: data.canSee,
          user_id: userId,
          tags: getHashTags(data.caption),
        };

        const idPost = await db("post").insert(postAdd).returning("id");

        if (idPost[0].id) {
          const relationAdd: PostMarked[] = [];
          if (data.idMarkers) {
            data.idMarkers.forEach((element) => {
              relationAdd.push(PostMarked.create(element.id, idPost[0].id, "marked"));
            });

            await db("post_user_marked").insert(relationAdd);
          }
        }
      });
    } catch (error) {
      console.log(error);

      //throw new Error("PE-UNKW");
    }
  }

  async getById(postId: string, userId: number): Promise<Post> {
    try {
      return this.db.transaction(async (db) => {
        const response: Post = await this.db("post").where({ id: postId, user_id: userId }).first();
        const marked: { username: string }[] = await this.db("post_user_marked")
          .select(["users.username"])
          .leftJoin("users", "post_user_marked.user_id", "users.id")
          .where("post_user_marked.post_id", postId);

        response.userMark = marked.map((el) => el.username);
        return response;
      });
    } catch (error) {
      console.log(error);

      throw new Error("PE-UNKW");
    }
  }

  async remove(postId: string, userId: number) {
    try {
      await this.db("post").delete().where({ id: postId, user_id: userId });
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async update(data: updatePost, postId: string, userId: number, usersMarked: number[]) {
    try {
      await this.db.transaction(async (db) => {
        await db("post")
          .update({
            post_commentable: data.post_commentable,
            visibility: data.visibility,
            caption: data.caption,
            tags: data.tags,
          })
          .where({ id: postId, user_id: userId });

        await db("post_user_marked").delete().where({ post_id: postId });

        await db("post_user_marked").insert(
          usersMarked.map((userId) => ({
            user_id: userId,
            post_id: postId,
          })),
        );
      });
    } catch (error) {
      console.log(error);

      throw new Error("PE-UNKW");
    }
  }

  async likeOrUnlikePost(postId: string, userId: number) {
    try {
      try {
        await this.db("post_like").insert({ post_id: postId, user_id: userId });
      } catch (error) {
        if ((error as { code?: string }).code === "23505") {
          await this.db("post_like").delete().where({ post_id: postId, user_id: userId });
        } else {
          throw new Error("PE-UNKW");
        }
      }
    } catch (error) {
      throw new Error("PE-UNKW");
    }
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

  async simplePost(postId: string, userId: number): Promise<SimplePost> {
    try {
      return await this.db.transaction(async (db) => {
        let myVisibility = ["*"];

        const profileUserId: { user_id: number } = await db("post").select("user_id").where({ id: postId }).first();
        const profileId = profileUserId.user_id;

        if (!profileId) throw new Error("PC-E-PNE");

        const isMyProfile = profileId == userId;
        const ProfileIsMyFollower =
          (await db("user_follow_user").where({ follower: profileId, following: userId })).length > 0 ? true : false;
        const iFollow = (await db("user_follow_user").where({ follower: userId, following: profileId })).length > 0 ? true : false;
        const iLike = (await db("post_like").where({ post_id: postId, user_id: userId }).first()) == undefined ? false : true;
        if (isMyProfile) {
          myVisibility = ["*", "onlyFallowers", "onlyIFallow", "fallowersAndIFallow", "draft", "archived"];
        } else if (ProfileIsMyFollower) {
          myVisibility.push(convertVisibility["onlyIFallow"]);
        } else if (iFollow) {
          myVisibility.push(convertVisibility["onlyFallowers"]);
        } else if (iFollow && ProfileIsMyFollower) {
          myVisibility.push(convertVisibility["fallowersAndIFallow"]);
        }

        const response: SimplePost = await db("post")
          .select([
            "post.picture",
            "post.caption",
            "post.created_at",
            "users.username",
            "users.picture as pictureUser",
            "post.post_commentable as commentState",
            db.raw("COUNT(DISTINCT post_like.user_id) as likes"),
          ])
          .leftJoin("users", "users.id", "post.user_id")
          .leftJoin("post_like", "post_like.post_id", "post.id")
          .where("post.id", postId)
          .andWhere((builder) => {
            builder.whereIn("post.visibility", myVisibility);
          })
          .groupBy(["post.picture", "post.caption", "post.created_at", "users.username", "users.picture", "post.post_commentable"])
          .first();

        if (!response) throw new Error("PC-E-PNE");

        const comments: comments[] = await db("post_comments")
          .select(["users.username", "users.picture as pictureUser", "post_comments.comment"])
          .leftJoin("users", "users.id", "post_comments.user_id")
          .where("post_comments.post_id", postId)
          .orderBy("post_comments.created_at", "desc");

        const userMark: { username: string; picture: string }[] = await db("post_user_marked")
          .select(["users.username", "users.picture"])
          .leftJoin("users", "users.id", "post_user_marked.user_id")
          .where({ post_id: postId });

        response.userMark = userMark;
        response.comments = comments;
        response.commentsNumber = comments.length;
        response.iCanComment = myVisibility.find((v, i) => v == response.commentState) != undefined;
        response.iLike = iLike;
        return response;
      });
    } catch (error) {
      if (error instanceof Error && error.message === "PC-E-PNE") {
        throw new Error("PC-E-PNE");
      } else {
        throw new Error("PE-UNKW");
      }
    }
  }
}
