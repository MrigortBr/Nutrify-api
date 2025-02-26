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
const type_1 = require("./type");
const PostMarked_1 = require("../../entities/PostMarked");
function getHashTags(data) {
    return data.split("#").splice(1);
}
class PostModel {
    constructor(db) {
        this.db = db;
    }
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db("users").select("id").whereIn("username", username);
            }
            catch (error) {
                throw new Error("PE-UNKW");
            }
        });
    }
    insertPostAndMarked(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.transaction((db) => __awaiter(this, void 0, void 0, function* () {
                    const postAdd = {
                        caption: data.caption,
                        picture: data.image,
                        post_commentable: data.canComment,
                        visibility: data.canSee,
                        user_id: userId,
                        tags: getHashTags(data.caption),
                    };
                    const idPost = yield db("post").insert(postAdd).returning("id");
                    if (idPost[0].id) {
                        const relationAdd = [];
                        if (data.idMarkers) {
                            data.idMarkers.forEach((element) => {
                                relationAdd.push(PostMarked_1.PostMarked.create(element.id, idPost[0].id, "marked"));
                            });
                            yield db("post_user_marked").insert(relationAdd);
                        }
                    }
                }));
            }
            catch (error) {
                console.log(error);
                //throw new Error("PE-UNKW");
            }
        });
    }
    getById(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.db.transaction((db) => __awaiter(this, void 0, void 0, function* () {
                    const response = yield this.db("post").where({ id: postId, user_id: userId }).first();
                    const marked = yield this.db("post_user_marked")
                        .select(["users.username"])
                        .leftJoin("users", "post_user_marked.user_id", "users.id")
                        .where("post_user_marked.post_id", postId);
                    response.userMark = marked.map((el) => el.username);
                    return response;
                }));
            }
            catch (error) {
                console.log(error);
                throw new Error("PE-UNKW");
            }
        });
    }
    remove(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db("post").delete().where({ id: postId, user_id: userId });
            }
            catch (error) {
                throw new Error("PE-UNKW");
            }
        });
    }
    update(data, postId, userId, usersMarked) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db.transaction((db) => __awaiter(this, void 0, void 0, function* () {
                    yield db("post")
                        .update({
                        post_commentable: data.post_commentable,
                        visibility: data.visibility,
                        caption: data.caption,
                        tags: data.tags,
                    })
                        .where({ id: postId, user_id: userId });
                    yield db("post_user_marked").delete().where({ post_id: postId });
                    yield db("post_user_marked").insert(usersMarked.map((userId) => ({
                        user_id: userId,
                        post_id: postId,
                    })));
                }));
            }
            catch (error) {
                console.log(error);
                throw new Error("PE-UNKW");
            }
        });
    }
    likeOrUnlikePost(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                try {
                    yield this.db("post_like").insert({ post_id: postId, user_id: userId });
                }
                catch (error) {
                    if (error.code === "23505") {
                        yield this.db("post_like").delete().where({ post_id: postId, user_id: userId });
                    }
                    else {
                        throw new Error("PE-UNKW");
                    }
                }
            }
            catch (error) {
                throw new Error("PE-UNKW");
            }
        });
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
    simplePost(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.transaction((db) => __awaiter(this, void 0, void 0, function* () {
                    let myVisibility = ["*"];
                    const profileUserId = yield db("post").select("user_id").where({ id: postId }).first();
                    const profileId = profileUserId.user_id;
                    if (!profileId)
                        throw new Error("PC-E-PNE");
                    const isMyProfile = profileId == userId;
                    const ProfileIsMyFollower = (yield db("user_follow_user").where({ follower: profileId, following: userId })).length > 0 ? true : false;
                    const iFollow = (yield db("user_follow_user").where({ follower: userId, following: profileId })).length > 0 ? true : false;
                    const iLike = (yield db("post_like").where({ post_id: postId, user_id: userId }).first()) == undefined ? false : true;
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
                    const response = yield db("post")
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
                    if (!response)
                        throw new Error("PC-E-PNE");
                    const comments = yield db("post_comments")
                        .select(["users.username", "users.picture as pictureUser", "post_comments.comment"])
                        .leftJoin("users", "users.id", "post_comments.user_id")
                        .where("post_comments.post_id", postId)
                        .orderBy("post_comments.created_at", "desc");
                    const userMark = yield db("post_user_marked")
                        .select(["users.username", "users.picture"])
                        .leftJoin("users", "users.id", "post_user_marked.user_id")
                        .where({ post_id: postId });
                    response.userMark = userMark;
                    response.comments = comments;
                    response.commentsNumber = comments.length;
                    response.iCanComment = myVisibility.find((v, i) => v == response.commentState) != undefined;
                    response.iLike = iLike;
                    return response;
                }));
            }
            catch (error) {
                if (error instanceof Error && error.message === "PC-E-PNE") {
                    throw new Error("PC-E-PNE");
                }
                else {
                    throw new Error("PE-UNKW");
                }
            }
        });
    }
}
exports.default = PostModel;
