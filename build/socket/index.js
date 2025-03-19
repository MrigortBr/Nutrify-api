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
exports.Socket = void 0;
const socket_io_1 = require("socket.io");
const usernameToken_1 = require("../entities/usernameToken");
const model_1 = __importDefault(require("./model"));
const types_1 = require("./types");
class Socket {
    constructor(server) {
        this.dbSocket = new usernameToken_1.DbSocket();
        this.model = new model_1.default();
        this.server = server;
        this.io = new socket_io_1.Server(this.server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
                allowedHeaders: ["Content-Type"],
            },
        });
        this.createSocketServer();
    }
    createSocketServer() {
        this.io.on("connection", (socket) => {
            socket.on("loadMy", (data) => {
                this.dbSocket.addOrUpdate(new usernameToken_1.UserToken(socket.id, data.username));
                this.io.emit(`${data.username}Online`, true);
            });
            socket.on("myChats", () => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const myUsername = (_a = this.dbSocket.findUserTokenByToken(socket.id)) === null || _a === void 0 ? void 0 : _a.getUsername();
                if (myUsername) {
                    const { id } = yield this.model.getIdByUsername(myUsername || "");
                    if (id) {
                        const r = yield this.model.getMyChats(id);
                        socket.emit(`${socket.id}myChats`, r);
                    }
                }
            }));
            socket.on("userIsOnline", (data) => {
                const user = this.dbSocket.findUserTokenByUsername(data.username);
                socket.emit(`${data.username}Online`, user ? true : false);
            });
            socket.on("getChat", (data) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const myUsername = (_a = this.dbSocket.findUserTokenByToken(socket.id)) === null || _a === void 0 ? void 0 : _a.getUsername();
                if (myUsername && data.username) {
                    const myId = yield this.model.getIdByUsername(myUsername);
                    const userId = yield this.model.getIdByUsername(data.username);
                    if (userId.id && myId.id) {
                        const r = yield this.model.getMyNewChat(userId.id, myId.id);
                        socket.emit(`${socket.id}${data.username}ReciveChat`, { r });
                    }
                }
            }));
            socket.on("loadMessage", (data) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const myUsername = (_a = this.dbSocket.findUserTokenByToken(socket.id)) === null || _a === void 0 ? void 0 : _a.getUsername();
                if (myUsername && data.username) {
                    const myId = yield this.model.getIdByUsername(myUsername);
                    const userId = yield this.model.getIdByUsername(data.username);
                    if (userId.id && myId.id) {
                        yield this.model.readMessages(userId.id, myId.id);
                    }
                }
            }));
            socket.on("getHistory", (data) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const { username } = data;
                    const userId = yield this.model.getIdByUsername(username);
                    const myUsername = (_a = this.dbSocket.findUserTokenByToken(socket.id)) === null || _a === void 0 ? void 0 : _a.getUsername();
                    const myId = yield this.model.getIdByUsername(myUsername || "");
                    const r = yield this.model.getHistory(myId.id, userId.id);
                    const response = (0, types_1.dataDBAForData)(r, myId.id.toString(), myUsername || "", username);
                    socket.emit(`${socket.id}${username}getHistory`, response);
                }
                catch (error) {
                    //console.log(error);
                }
            }));
            socket.on("OnChangeText", (data) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { username, change } = data;
                    const dbSocketTo = this.dbSocket.findUserTokenByUsername(username);
                    if (dbSocketTo) {
                        const dbSocketMy = this.dbSocket.findUserTokenByToken(socket.id);
                        if (dbSocketMy) {
                            socket.to(dbSocketTo.getIdToken()).emit(`${dbSocketTo.getIdToken()}${dbSocketMy.getUsername()}`, { change });
                        }
                    }
                    else {
                        console.log("Nao encontrado");
                    }
                }
                catch (error) {
                    //console.log(error);
                }
            }));
            socket.on("sendMessage", (data) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const { username, message } = data;
                    const userId = yield this.model.getIdByUsername(username);
                    const myUsername = (_a = this.dbSocket.findUserTokenByToken(socket.id)) === null || _a === void 0 ? void 0 : _a.getUsername();
                    const myId = yield this.model.getIdByUsername(myUsername !== null && myUsername !== void 0 ? myUsername : "");
                    const r = yield this.model.setNewMessage(myId.id, userId.id, message);
                    const response = (0, types_1.dataDBAForData)(r, myId.id.toString(), myUsername || "", username);
                    socket.emit(`${socket.id}${username}sendedMessage`, response);
                    if (userId) {
                        const userSendedToken = this.dbSocket.findUserTokenByUsername(username);
                        if (userSendedToken) {
                            socket.to(userSendedToken.getIdToken()).emit(`${userSendedToken.getIdToken()}${myUsername}recivedMessage`, response);
                            socket.to(userSendedToken.getIdToken()).emit(`${userSendedToken.getIdToken()}CurrierChat`, response);
                        }
                    }
                }
                catch (error) { }
            }));
            socket.on("getProfile", (data) => __awaiter(this, void 0, void 0, function* () {
                const profiles = yield this.model.getProfileByNameOrUsername(data.search);
                this.io.emit(`${socket.id}getProfile${data.search}`, profiles);
            }));
            socket.on("disconnect", () => {
                const user = this.dbSocket.findUserTokenByToken(socket.id);
                this.io.emit(`${user === null || user === void 0 ? void 0 : user.getUsername()}Online`, false);
            });
        });
    }
}
exports.Socket = Socket;
