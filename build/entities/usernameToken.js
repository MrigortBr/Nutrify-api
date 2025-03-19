"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbSocket = exports.UserToken = void 0;
class UserToken {
    constructor(idToken, username) {
        this.idToken = idToken;
        this.username = username;
    }
    getIdToken() {
        return this.idToken;
    }
    setIdToken(idToken) {
        this.idToken = idToken;
    }
    getUsername() {
        return this.username;
    }
    setUsername(username) {
        this.username = username;
    }
}
exports.UserToken = UserToken;
class DbSocket {
    constructor() {
        this.users = [];
    }
    addOrUpdate(user) {
        const my = this.findUserTokenByUsername(user.getUsername());
        if (my) {
            my.setIdToken(user.getIdToken());
        }
        else {
            this.setUserToken(user);
        }
    }
    setUserToken(user) {
        this.users.push(user);
    }
    findUserTokenByUsername(username) {
        return this.users.find((userToken) => userToken.getUsername() === username) || null;
    }
    findUserTokenByToken(token) {
        return this.users.find((userToken) => userToken.getIdToken() === token) || null;
    }
}
exports.DbSocket = DbSocket;
