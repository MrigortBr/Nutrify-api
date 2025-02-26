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
class ResetModel {
    constructor(db) {
        this.db = db;
    }
    getIdByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (yield this.db("users").where({ email }).first());
                if (!user)
                    throw new Error("PE-EMIN");
                return user;
            }
            catch (e) {
                const error = e;
                throw new Error(error.message);
            }
        });
    }
    createTokenToReset(passwordReset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, user_id, status } = passwordReset;
                return yield this.db("password_reset").insert({ token, user_id, status });
            }
            catch (error) {
                throw new Error("PE-UNKW");
            }
        });
    }
    closeAllTokens(passwordReset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db("password_reset").update({ status: "expired" }).where({ user_id: passwordReset.user_id, status: "open" });
            }
            catch (error) {
                throw new Error("PE-UNKW");
            }
        });
    }
    getIdFromToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.db("password_reset").select("user_id").where({ token: token, status: "open" }).first();
                if (result == undefined) {
                    throw new Error("PE-TKNF");
                }
                return result.user_id;
            }
            catch (error) {
                throw new Error("PE-TKNF");
            }
        });
    }
    updatePasswordUserFromId(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db("users").update({ password }).where({ id: id });
            }
            catch (error) {
                throw new Error("PE-UNKW");
            }
        });
    }
    closeToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db("password_reset").update({ status: "closed" }).where({ token: token });
            }
            catch (error) {
                throw new Error("PE-UNKW");
            }
        });
    }
}
exports.default = ResetModel;
