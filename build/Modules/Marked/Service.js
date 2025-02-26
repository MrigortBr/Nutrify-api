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
const Model_1 = __importDefault(require("./Model"));
const Responses_1 = require("./Responses");
class MarkedService {
    constructor() {
        this.model = new Model_1.default(connection_1.default.getInstance());
        this.Geral = new Service_1.default();
    }
    getMarkedPosts(username, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Geral.validateUserName(username);
            const profileId = yield this.Geral.getIdByUsername(username);
            const visibility = yield this.Geral.getVisibilityForProfile(profileId[0], userid);
            const r = yield this.model.getMarkedPosts(profileId[0], userid, visibility);
            const response = Responses_1.returnResponse["FC_PR_PML"];
            response.picture = r;
            return response;
        });
    }
}
exports.default = MarkedService;
