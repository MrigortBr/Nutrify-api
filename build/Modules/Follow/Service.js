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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../data/connection"));
const Model_1 = __importDefault(require("./Model"));
const Responses_1 = require("./Responses");
class FollowService {
    constructor() {
        this.model = new Model_1.default(connection_1.default.getInstance());
    }
    follow(username, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!username || !username.trim())
                throw new Error("FC-E-NU");
            const id = yield this.model.findUserByUsername(username);
            yield this.model.followUser(userId, id);
            return Responses_1.returnResponse["FC_PR_UF"];
        });
    }
    unfollow(username, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!username || !username.trim())
                throw new Error("FC-E-NU");
            const id = yield this.model.findUserByUsername(username);
            yield this.model.unfollowUser(userId, id);
            return Responses_1.returnResponse["FC_PR_UUF"];
        });
    }
}
exports.default = FollowService;
