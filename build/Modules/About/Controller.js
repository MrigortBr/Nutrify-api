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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutController = void 0;
const typeAbout_1 = __importDefault(require("./typeAbout"));
const routerDecorator_1 = require("../../base/routerDecorator");
const Middleware_1 = __importDefault(require("../../middlewares/authorization/Middleware"));
let AboutController = class AboutController {
    about(req, res) {
        res.status(200);
        res.json(typeAbout_1.default);
    }
};
exports.AboutController = AboutController;
__decorate([
    (0, routerDecorator_1.Get)("/", [Middleware_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AboutController.prototype, "about", null);
exports.AboutController = AboutController = __decorate([
    (0, routerDecorator_1.Controller)("/")
], AboutController);
