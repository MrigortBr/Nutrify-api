"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMarked = void 0;
class PostMarked {
    constructor(id, userId, postId, status, createdAt) {
        this.id = id;
        this.user_id = userId;
        this.post_id = postId;
        this.status = status;
        this.created_at = createdAt;
    }
    static create(userId, postId, status = "marked") {
        return new PostMarked(undefined, userId, postId, status, undefined);
    }
}
exports.PostMarked = PostMarked;
