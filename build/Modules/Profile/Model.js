"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("../post/type");
class ProfileModel {
    constructor(db) {
        this.db = db;
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.db("users").select("id").where({ username }).first();
                if (!response)
                    throw new Error("FC-E-UNF");
                return response.id;
            }
            catch (e) {
                const error = e;
                throw new Error(error.message);
            }
        });
    }
    getProfile(profileId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.db.transaction((db) => __awaiter(this, void 0, void 0, function* () {
                    let myVisibility = ["*"];
                    const isMyProfile = profileId == id;
                    const ProfileIsMyFollower = (yield db("user_follow_user").where({ follower: profileId, following: id })).length > 0 ? true : false;
                    const iFollow = (yield db("user_follow_user").where({ follower: id, following: profileId })).length > 0 ? true : false;
                    if (isMyProfile) {
                        myVisibility = ["*", "onlyFollowers", "onlyIFollow", "followersAndIFollow", "draft", "archived"];
                    }
                    if (ProfileIsMyFollower) {
                        myVisibility.push(type_1.convertVisibility["onlyIFollow"]);
                    }
                    if (iFollow) {
                        myVisibility.push(type_1.convertVisibility["onlyFollowers"]);
                    }
                    if (iFollow && ProfileIsMyFollower) {
                        myVisibility.push(type_1.convertVisibility["followersAndIFollow"]);
                    }
                    const r = yield db("users")
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
                    const pictures = yield db("post")
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
                }));
                return response;
            }
            catch (e) {
                console.log(e);
                const error = e;
                throw new Error(error.message);
            }
        });
    }
    getSimpleProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db("users").select(["name", "username", "picture"]).where({ id }).first();
            }
            catch (e) {
                const error = e;
                console.log(error);
                throw new Error(error.message);
            }
        });
    }
    updateUser(profileId, profile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db("users")
                    .update({
                    name: profile.name,
                    username: profile.username,
                    picture: profile.picture,
                    bio: profile.bio,
                })
                    .where({ id: profileId });
            }
            catch (e) {
                console.log(e);
                const error = e;
                throw new Error(error.message);
            }
        });
    }
    getConfigUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db("users").select(["whosendmessage ", "whoseemyposts ", "whoseemyplanning "]).where({ id }).first();
            }
            catch (e) {
                const error = e;
                throw new Error(error.message);
            }
        });
    }
    updateConfigUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db("users").update(data).where({ id });
            }
            catch (e) {
                throw new Error("PE-UNKW");
            }
        });
    }
}
exports.default = ProfileModel;
