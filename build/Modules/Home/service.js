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
const Service_1 = __importDefault(require("../_Geral/Service"));
const Responses_1 = require("../post/Responses");
const model_1 = __importDefault(require("./model"));
class HomeService {
    constructor() {
        this.model = new model_1.default(connection_1.default.getInstance());
        this.geralService = new Service_1.default();
    }
    getHome(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = yield this.model.getHome(userid);
            yield Promise.all(r.map((element) => __awaiter(this, void 0, void 0, function* () {
                const visibility = yield this.geralService.userCanViewAndCanComment(element.id || "", userid);
                element.iCanComment = visibility.iCanComment;
            })));
            const response = Responses_1.returnResponse["PC_PR_PCC"];
            response.simplePost = r;
            return response;
        });
    }
    getFallow(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = yield this.geralService.getIdByUsername("ttt");
            const response = Responses_1.returnResponse["PC_PR_PCC"];
            return response;
        });
    }
}
exports.default = HomeService;
