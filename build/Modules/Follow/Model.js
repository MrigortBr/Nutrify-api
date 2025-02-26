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
class FollowModel {
    constructor(db) {
        this.db = db;
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
    followUser(follower, following) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db("user_follow_user").insert({ follower, following });
            }
            catch (error) {
                if (typeof error.code == "string") {
                    const code = error.code;
                    if (code == "23505")
                        throw new Error("FC-E-UHFU");
                }
                throw new Error("PE-UNKW");
            }
        });
    }
    unfollowUser(follower, following) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db("user_follow_user").delete().where({ follower, following });
            }
            catch (error) {
                if (typeof error.code == "string") {
                    const code = error.code;
                    if (code == "23505")
                        throw new Error("FC-E-UHFU");
                }
                throw new Error("PE-UNKW");
            }
        });
    }
}
exports.default = FollowModel;
