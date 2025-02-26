"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = __importDefault(require("../../../package.json"));
const aboutData = {
    name: package_json_1.default.name,
    version: package_json_1.default.version,
    author: package_json_1.default.author,
    license: package_json_1.default.license,
    repository: package_json_1.default.repository,
};
exports.default = aboutData;
