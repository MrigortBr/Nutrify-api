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
const model_1 = __importDefault(require("./model"));
const Responses_1 = require("./Responses");
require("./erros");
class PostService {
    constructor() {
        this.model = new model_1.default(connection_1.default.getInstance());
    }
    publish(data, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.markers.length > 0) {
                console.log("erro aqui");
                const res = yield this.model.getUserByUsername(data.markers);
                data.idMarkers = res;
            }
            yield this.model.insertPostAndMarked(data, idUser);
            return Responses_1.returnResponse["PC_PR_PCS"];
        });
    }
    getById(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!postId)
                throw new Error("PC-E-PNE");
            const post = yield this.model.getById(postId, userId);
            const response = Responses_1.returnResponse["PC_PR_PLS"];
            response.post = post;
            return response;
        });
    }
    removePost(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!postId)
                throw new Error("PC-E-PNE");
            const post = yield this.model.remove(postId, userId);
            const response = Responses_1.returnResponse["PC_PR_PDS"];
            return response;
        });
    }
    updatePost(data, postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersId = (yield this.model.getUserByUsername(data.userMark)).map((e) => e.id);
            yield this.model.update(data, postId, userId, usersId);
            const response = Responses_1.returnResponse["PC_PR_PUS"];
            return response;
        });
    }
    likeOrUnlikePost(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!postId)
                throw new Error("PC-E-PNE");
            yield this.model.likeOrUnlikePost(postId, userId);
            const response = Responses_1.returnResponse["PC_PR_PLI"];
            return response;
        });
    }
    simplePost(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!postId)
                throw new Error("PC-E-PNE");
            const r = yield this.model.simplePost(postId, userId);
            const response = Responses_1.returnResponse["PC_PR_PLS"];
            response.simplePost = r;
            return response;
        });
    }
}
exports.default = PostService;
