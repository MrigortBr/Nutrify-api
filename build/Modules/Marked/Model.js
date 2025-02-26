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
class MarkedModel {
    constructor(db) {
        this.db = db;
    }
    getMarkedPosts(profileId, id, visibility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.db.transaction((db) => __awaiter(this, void 0, void 0, function* () {
                    const r = yield db("post_user_marked")
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
                }));
            }
            catch (error) {
                console.log(error);
                throw new Error("PE-UNKW");
            }
        });
    }
}
exports.default = MarkedModel;
