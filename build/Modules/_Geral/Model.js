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
class GeralModel {
    constructor(db) {
        this.db = db;
    }
    getIdsByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const r = yield this.db("users").select("id").whereIn("username", username);
                if (r.length == 0) {
                    throw new Error("GC-E-UNF");
                }
                return r.map((e) => e.id);
            }
            catch (error) {
                if (error.message === "GC-E-UNF") {
                    throw new Error("GC-E-UNF");
                }
                throw new Error("PE-UNKW");
            }
        });
    }
    userCanViewAndCanComment(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = {
                    iCanComment: false,
                    iCanSee: false,
                };
                let myVisibility = ["*"];
                const user = yield this.db("post").select("user_id").where({ id: postId }).first();
                if (!user)
                    throw new Error("GC-E-PNE");
                const user_id = user.user_id;
                const isMyProfile = user_id == userId;
                const ProfileIsMyFollower = (yield this.db("user_follow_user").where({ follower: user_id, following: userId })).length > 0 ? true : false;
                const iFollow = (yield this.db("user_follow_user").where({ follower: userId, following: user_id })).length > 0 ? true : false;
                if (isMyProfile) {
                    myVisibility = ["*", "onlyFallowers", "onlyIFallow", "fallowersAndIFallow", "draft", "archived"];
                }
                else if (ProfileIsMyFollower) {
                    myVisibility.push(type_1.convertVisibility["onlyIFallow"]);
                }
                else if (iFollow) {
                    myVisibility.push(type_1.convertVisibility["onlyFallowers"]);
                }
                else if (iFollow && ProfileIsMyFollower) {
                    myVisibility.push(type_1.convertVisibility["fallowersAndIFallow"]);
                }
                const { post_commentable, visibility, whoseemyposts } = yield this.db("post")
                    .select(["post.post_commentable", "post.visibility", "users.whoseemyposts"])
                    .innerJoin("users", "post.user_id", "users.id")
                    .where("post.id", postId)
                    .first();
                response.iCanSee =
                    myVisibility.find((v, i) => v == visibility) != undefined && myVisibility.find((v, i) => v == whoseemyposts) != undefined;
                response.iCanComment = myVisibility.find((v, i) => v == post_commentable) != undefined;
                if (!response.iCanSee)
                    throw new Error("GC-E-UNS");
                return response;
            }
            catch (error) {
                if (error.message === "GC-E-PNE") {
                    throw new Error("GC-E-PNE");
                }
                else if (error.message === "GC-E-UNS") {
                    throw new Error("GC-E-UNS");
                }
                throw new Error("PE-UNKW");
            }
        });
    }
    getVisibilityForProfile(profileId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.db.transaction((db) => __awaiter(this, void 0, void 0, function* () {
                    let myVisibility = ["*"];
                    let myVisibilityUser = ["*"];
                    const isMyProfile = profileId == id;
                    const ProfileIsMyFollower = (yield db("user_follow_user").where({ follower: profileId, following: id })).length > 0 ? true : false;
                    const iFollow = (yield db("user_follow_user").where({ follower: id, following: profileId })).length > 0 ? true : false;
                    if (isMyProfile) {
                        myVisibility = ["*", "onlyFallowers", "onlyIFallow", "fallowersAndIFallow", "draft", "archived"];
                        myVisibilityUser = ["*", "onlyFallowers", "onlyIFallow", "fallowersAndIFallow"];
                    }
                    if (ProfileIsMyFollower) {
                        myVisibility.push(type_1.convertVisibility["onlyIFallow"]);
                        myVisibilityUser.push(type_1.convertVisibility["onlyIFallow"]);
                    }
                    if (iFollow) {
                        myVisibility.push(type_1.convertVisibility["onlyFallowers"]);
                        myVisibilityUser.push(type_1.convertVisibility["onlyIFallow"]);
                    }
                    if (iFollow && ProfileIsMyFollower) {
                        myVisibility.push(type_1.convertVisibility["fallowersAndIFallow"]);
                        myVisibilityUser.push(type_1.convertVisibility["fallowersAndIFallow"]);
                    }
                    return {
                        visibilityPosts: myVisibility,
                        visibilityComments: myVisibilityUser,
                    };
                }));
            }
            catch (error) {
                throw new Error("PE-UNKW");
            }
        });
    }
}
exports.default = GeralModel;
