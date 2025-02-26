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
class CommentsModel {
    constructor(db) {
        this.db = db;
    }
    commentInPost(postId, userId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db("post_comments").insert({
                    post_id: postId,
                    user_id: userId,
                    comment: comment,
                });
            }
            catch (error) {
                throw new Error("PE-UNKW");
            }
        });
    }
    getComments(postId, page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = {
                    comments: [],
                    nextPage: false,
                    page: page,
                    iCanComment: false,
                    commentsNumber: 0,
                };
                const comments = yield this.db("post_comments")
                    .select(["users.username", "post_comments.comment", "post_comments.id", "post_comments.created_at"])
                    .innerJoin("users", "users.id", "post_comments.user_id")
                    .where({ post_id: postId })
                    .limit(Number(size))
                    .offset(Number(page) * Number(size))
                    .orderBy("post_comments.created_at", "desc");
                response.comments = comments;
                const [{ totalComments }] = yield this.db("post_comments").where({ post_id: postId }).count("id as totalComments");
                response.commentsNumber = (_a = Number(totalComments)) !== null && _a !== void 0 ? _a : 0;
                const r = yield this.db("post_comments").where({ post_id: postId }).count("id as total").first();
                if (r != undefined)
                    response.nextPage = Number(page) + 10 < Number(r.total);
                return response;
            }
            catch (error) {
                console.log(error);
                throw new Error("PE-UNKW");
            }
        });
    }
    deleteMyComment(postId, idUser, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db("post_comments").delete().where({ post_id: postId, user_id: idUser, id: commentId });
            }
            catch (error) {
                throw new Error("PE-UNKW");
            }
        });
    }
}
exports.default = CommentsModel;
