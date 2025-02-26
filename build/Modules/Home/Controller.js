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
const service_1 = __importDefault(require("./service"));
let HomeController = class HomeController {
    constructor() {
        this.service = new service_1.default();
    }
    getHome(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield this.service.getHome(((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 0);
                res.json(response).status(response.statusCode);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getFallow(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield this.service.getFallow(((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 0);
                res.json(response).status(response.statusCode);
            }
            catch (error) {
                next(error);
            }
        });
    }
};
__decorate([
    (0, routerDecorator_1.Get)("/foryou", [Middleware_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getHome", null);
__decorate([
    (0, routerDecorator_1.Get)("/fallow", [Middleware_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getFallow", null);
HomeController = __decorate([
    (0, routerDecorator_1.Controller)("/home"),
    __metadata("design:paramtypes", [])
], HomeController);
exports.default = HomeController;
