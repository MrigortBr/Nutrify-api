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
class HomeModel {
    constructor(db) {
        this.db = db;
    }
    getHome(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.db.transaction((db) => __awaiter(this, void 0, void 0, function* () {
                    let myVisibility = ["*"];
                    let r = yield db("post")
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
                }));
            }
            catch (error) {
                throw new Error("PE-UNKW");
            }
        });
    }
}
exports.default = HomeModel;
