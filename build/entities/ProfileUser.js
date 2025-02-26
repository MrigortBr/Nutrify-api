"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProfileUser {
    constructor(picture, username, followers, following, name, bio, pictures) {
        this.picture = picture;
        this.username = username;
        this.followers = followers;
        this.following = following;
        this.name = name;
        this.bio = bio;
        this.pictures = pictures;
    }
}
exports.default = ProfileUser;
