"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const routerDecorator_1 = require("../../base/routerDecorator");
const Middleware_1 = __importDefault(require("../../middlewares/authorization/Middleware"));
const Service_1 = __importDefault(require("./Service"));
let ProfileController = class ProfileController {
    constructor() {
        this.service = new Service_1.default();
    }
    getSimpleProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield this.service.getSimpleProfile(((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 0);
                res.json(response).status(response.statusCode);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield this.service.getProfile(req.params.username, ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 0);
                res.json(response).status(response.statusCode);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const profile = req.body;
                const response = yield this.service.updateProfile(profile, ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 0);
                res.json(response).status(response.statusCode);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getConfigUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield this.service.getConfigUser(((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 0);
                res.json(response).status(response.statusCode);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateConfigUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield this.service.updateConfigUser(((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 0, req.body.data);
                res.json(response).status(response.statusCode);
            }
            catch (error) {
                next(error);
            }
        });
    }
};
__decorate([
    (0, routerDecorator_1.Get)("/s/", [Middleware_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getSimpleProfile", null);
__decorate([
    (0, routerDecorator_1.Get)("/:username", [Middleware_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getProfile", null);
__decorate([
    (0, routerDecorator_1.Put)("/", [Middleware_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateProfile", null);
__decorate([
    (0, routerDecorator_1.Get)("/config/privacy", [Middleware_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getConfigUser", null);
__decorate([
    (0, routerDecorator_1.Put)("/config", [Middleware_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateConfigUser", null);
ProfileController = __decorate([
    (0, routerDecorator_1.Controller)("/profile"),
    __metadata("design:paramtypes", [])
], ProfileController);
exports.default = ProfileController;
