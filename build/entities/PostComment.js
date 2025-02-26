"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostLike {
    constructor(id, userId, postId, comment, createdAt) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.comment = comment;
        this.createdAt = createdAt;
    }
}
exports.default = PostLike;
