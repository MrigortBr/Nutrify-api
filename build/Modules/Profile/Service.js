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
const ServiceAll_1 = require("../../base/ServiceAll");
const connection_1 = __importDefault(require("../../data/connection"));
const Model_1 = __importDefault(require("./Model"));
const Responses_1 = require("./Responses");
require("./errors");
class ProfileService {
    constructor() {
        this.model = new Model_1.default(connection_1.default.getInstance());
    }
    getProfile(username, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!username || !username.trim())
                throw new Error("PC-E-NU");
            const profileId = yield this.model.findUserByUsername(username);
            const r = yield this.model.getProfile(profileId, idUser);
            const response = Responses_1.returnResponse["PC_PR_PFS"];
            response.profile = r;
            return response;
        });
    }
    getSimpleProfile(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = yield this.model.getSimpleProfile(idUser);
            if (!r)
                throw new Error("PC-E-ND");
            const response = Responses_1.returnResponse["PC_PR_PFS"];
            response.simpleProfile = r;
            return response;
        });
    }
    updateProfile(profile, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!profile)
                throw new Error("PC-E-ND");
            yield this.model.updateUser(idUser, profile);
            const response = Responses_1.returnResponse["PC_PR_PUS"];
            return response;
        });
    }
    getConfigUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const privacy = yield this.model.getConfigUser(idUser);
            const response = Responses_1.returnResponse["PC_PR_PCS"];
            response.privacy = privacy;
            return response;
        });
    }
    updateConfigUser(idUser, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = Responses_1.returnResponse["PC_PR_PCU"];
            const newData = {
                whosendmessage: data.whosendmessage,
                whoseemyplanning: data.whoseemyplanning,
                whoseemyposts: data.whoseemyposts,
            };
            if (data.password) {
                newData.password = yield (0, ServiceAll_1.hashPasswordByPassword)(data.password);
            }
            if ((0, ServiceAll_1.isValidEmail)(data.email))
                newData.email = data.email;
            this.model.updateConfigUser(idUser, newData);
            return response;
        });
    }
}
exports.default = ProfileService;
