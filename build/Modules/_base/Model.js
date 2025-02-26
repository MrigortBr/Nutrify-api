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
class BaseModel {
    constructor(db) {
        this.db = db;
    }
    unfallowUser(follower, following) {
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
exports.default = BaseModel;
