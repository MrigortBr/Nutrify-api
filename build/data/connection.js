"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
class DatabaseConnection {
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = (0, knex_1.default)({
                client: "postgresql",
                connection: {
                    host: process.env.DB_HOST,
                    database: process.env.DB_DATABASE,
                    user: process.env.DB_USER,
                    password: process.env.DB_PWD,
                    ssl: { rejectUnauthorized: false },
                },
                pool: {
                    min: 2,
                    max: 10,
                },
            });
        }
        return this.instance;
    }
}
DatabaseConnection.instance = null;
exports.default = DatabaseConnection;
