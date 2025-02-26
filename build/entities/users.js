"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, username, picture, email, password, created_at, updated_at, bio) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.picture = picture;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.bio = bio;
    }
}
exports.User = User;
