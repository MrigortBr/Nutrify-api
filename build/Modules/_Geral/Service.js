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
require("./erros");
class GeralService {
    constructor() {
        this.model = new Model_1.default(connection_1.default.getInstance());
    }
    validatePostID(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!postId)
                throw new Error("GC-E-PNE");
        });
    }
    validateUserName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!username || !username.trim())
                throw new Error("GC-E-UNF");
        });
    }
    getIdByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateUserName(username);
            return yield this.model.getIdsByUsername([username]);
        });
    }
    userCanViewAndCanComment(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.userCanViewAndCanComment(postId, userId);
        });
    }
    getVisibilityForProfile(profileId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.getVisibilityForProfile(profileId, userId);
        });
    }
}
exports.default = GeralService;
