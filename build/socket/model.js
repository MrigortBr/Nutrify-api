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
const connection_1 = __importDefault(require("../data/connection"));
function getMinMax(num1, num2) {
    const menorNumero = Math.min(num1, num2);
    const maiorNumero = Math.max(num1, num2);
    return `${menorNumero},${maiorNumero}`;
}
class SocketModel {
    constructor() {
        this.db = connection_1.default.getInstance();
    }
    getIdByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db("users").select("id").where("username", username).first();
            }
            catch (error) {
                throw new Error("PE-UNKW");
            }
        });
    }
    setNewMessage(user_id_one, user_id_two, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db("user_message_user")
                    .insert({ user_id_one, user_id_two, message, identifier_chat: getMinMax(user_id_one, user_id_two) })
                    .returning("*");
            }
            catch (error) {
                console.log(error);
                throw new Error("PE-UNKW");
            }
        });
    }
    getHistory(user_id_one, user_id_two) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db("user_message_user")
                    .select("*")
                    .where({ user_id_one, user_id_two })
                    .orWhere({ user_id_one: user_id_two, user_id_two: user_id_one });
            }
            catch (error) {
                throw new Error("PE-UNKW");
            }
        });
    }
    getMyNewChat(userId, myId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { picture } = yield this.db("users").select("picture").where({ id: userId }).first();
                return picture;
            }
            catch (e) {
                return "";
            }
        });
    }
    readMessages(user_id_one, user_id_two) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db("user_message_user").update({ read: true }).where({ user_id_one, user_id_two });
            }
            catch (e) {
                return "";
            }
        });
    }
    getMyChats(userIdRequester) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chats_identifier = yield this.db("user_message_user")
                    .select("identifier_chat")
                    .where({ user_id_one: userIdRequester })
                    .orWhere({ user_id_two: userIdRequester })
                    .groupBy("identifier_chat");
                const promises = chats_identifier.map((v) => __awaiter(this, void 0, void 0, function* () {
                    const result = yield this.db("user_message_user")
                        .where("identifier_chat", v.identifier_chat)
                        .orderBy("created_at", "desc")
                        .select("message", "created_at")
                        .limit(1)
                        .first();
                    const idTo = v.identifier_chat.split(",")[0] == userIdRequester.toString() ? v.identifier_chat.split(",")[1] : v.identifier_chat.split(",")[0];
                    const user = yield this.db("users").select("username", "picture").where("id", idTo).first();
                    const noRead = yield this.db("user_message_user")
                        .where("user_id_one", idTo)
                        .andWhere("user_id_two", userIdRequester)
                        .andWhere("read", false);
                    result.user = user;
                    result.noRead = noRead.length;
                    return result;
                }));
                const lastChats = yield Promise.all(promises);
                return lastChats;
            }
            catch (error) {
                throw new Error("PE-UNKW");
            }
        });
    }
    getProfileByNameOrUsername(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.db("users")
                    .select("picture", "username", "name")
                    .where("username", "like", `%${name}%`)
                    .orWhere("name", "like", `%${name}%`);
                return response;
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
    }
}
exports.default = SocketModel;
