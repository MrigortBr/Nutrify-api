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
const Responses_1 = require("./Responses");
const connection_1 = __importDefault(require("../../data/connection"));
const Model_1 = __importDefault(require("./Model"));
const Service_1 = __importDefault(require("../_Geral/Service"));
class CommentsService {
    constructor() {
        this.model = new Model_1.default(connection_1.default.getInstance());
        this.geralService = new Service_1.default();
    }
    commentInPost(postId, userId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!postId)
                throw new Error("PC-E-PNE");
            if (!comment)
                throw new Error("PC-E-CNE");
            const r = yield this.model.commentInPost(postId, userId, comment);
            const response = Responses_1.returnResponse["CC_PR_CCS"];
            return response;
        });
    }
    deleteMyComment(postId, idUser, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.deleteMyComment(postId, idUser, commentId);
            const response = Responses_1.returnResponse["CC_PR_CDS"];
            return response;
        });
    }
    getComments(postId, page, idUser, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const visibility = yield this.geralService.userCanViewAndCanComment(postId, idUser);
            const data = yield this.model.getComments(postId, page, size);
            data.iCanComment = visibility.iCanComment;
            const response = Responses_1.returnResponse["CC_PR_CLS"];
            response.comments = data;
            return response;
        });
    }
}
exports.default = CommentsService;
