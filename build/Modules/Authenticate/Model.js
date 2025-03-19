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
exports.UserModel = void 0;
class UserModel {
    constructor(db) {
        this.db = db;
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (yield this.db("users").where({ email }).first());
                if (!user)
                    throw new Error("PE-IELL-PW");
                return user;
            }
            catch (e) {
                const error = e;
                throw new Error(error.message);
            }
        });
    }
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.db("users").insert(user).returning("id");
                return result[0];
            }
            catch (error) {
                console.log(error);
                if (typeof error.code == "string") {
                    const code = error.code;
                    if (code == "23505")
                        throw new Error("PG-23505-EM");
                }
                throw new Error("PE-UNKW");
            }
        });
    }
}
exports.UserModel = UserModel;
