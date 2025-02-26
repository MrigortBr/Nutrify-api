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
                    host: "dpg-cuj03prqf0us73dvcep0-a.oregon-postgres.render.com",
                    database: "server_test_render",
                    user: "server_test_render_user",
                    password: "iLDCVMd1i4mIH4yxXbBLZBvF3n3PmkOs",
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
