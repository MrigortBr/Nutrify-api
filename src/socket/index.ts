import { Server as SocketIOServer } from "socket.io";
import http, { Server } from "http";
import { DbSocket, UserToken } from "../entities/usernameToken";
import SocketModel from "./model";
import { dataDBAForData } from "./types";

export class Socket {
  private server: Server;
  public io: SocketIOServer;
  public dbSocket: DbSocket = new DbSocket();
  public model: SocketModel = new SocketModel();

  constructor(server: Server) {
    this.server = server;
    this.io = new SocketIOServer(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
      },
    });
    this.createSocketServer();
  }

  private createSocketServer() {
    this.io.on("connection", (socket) => {
      socket.on("loadMy", (data: { username: string }) => {
        this.dbSocket.addOrUpdate(new UserToken(socket.id, data.username));
        this.io.emit(`${data.username}Online`, true);
      });

      socket.on("myChats", async () => {
        const myUsername = this.dbSocket.findUserTokenByToken(socket.id)?.getUsername();
        if (myUsername) {
          const { id } = await this.model.getIdByUsername(myUsername || "");
          if (id) {
            const r = await this.model.getMyChats(id);
            socket.emit(`${socket.id}myChats`, r);
          }
        }
      });

      socket.on("userIsOnline", (data: { username: string }) => {
        const user = this.dbSocket.findUserTokenByUsername(data.username);
        socket.emit(`${data.username}Online`, user ? true : false);
      });

      socket.on("getChat", async (data: { username: string }) => {
        const myUsername = this.dbSocket.findUserTokenByToken(socket.id)?.getUsername();
        if (myUsername && data.username) {
          const myId = await this.model.getIdByUsername(myUsername);
          const userId = await this.model.getIdByUsername(data.username);
          if (userId.id && myId.id) {
            const r = await this.model.getMyNewChat(userId.id, myId.id);
            socket.emit(`${socket.id}${data.username}ReciveChat`, { r });
          }
        }
      });

      socket.on("loadMessage", async (data: { username: string }) => {
        const myUsername = this.dbSocket.findUserTokenByToken(socket.id)?.getUsername();
        if (myUsername && data.username) {
          const myId = await this.model.getIdByUsername(myUsername);
          const userId = await this.model.getIdByUsername(data.username);
          if (userId.id && myId.id) {
            await this.model.readMessages(userId.id, myId.id);
          }
        }
      });

      socket.on("getHistory", async (data: { username: string }) => {
        try {
          const { username } = data;
          const userId = await this.model.getIdByUsername(username);
          const myUsername = this.dbSocket.findUserTokenByToken(socket.id)?.getUsername();
          const myId = await this.model.getIdByUsername(myUsername || "");
          const r = await this.model.getHistory(myId.id, userId.id);
          const response = dataDBAForData(r, myId.id.toString(), myUsername || "", username);
          socket.emit(`${socket.id}${username}getHistory`, response);
        } catch (error) {
          //console.log(error);
        }
      });

      socket.on("OnChangeText", async (data: { change: boolean; username: string }) => {
        try {
          const { username, change } = data;
          const dbSocketTo = this.dbSocket.findUserTokenByUsername(username);
          if (dbSocketTo) {
            const dbSocketMy = this.dbSocket.findUserTokenByToken(socket.id);
            if (dbSocketMy) {
              socket.to(dbSocketTo.getIdToken()).emit(`${dbSocketTo.getIdToken()}${dbSocketMy.getUsername()}`, { change });
            }
          } else {
            console.log("Nao encontrado");
          }
        } catch (error) {
          //console.log(error);
        }
      });

      socket.on("sendMessage", async (data: { username: string; message: string }) => {
        try {
          const { username, message } = data;
          const userId = await this.model.getIdByUsername(username);
          const myUsername = this.dbSocket.findUserTokenByToken(socket.id)?.getUsername();
          const myId = await this.model.getIdByUsername(myUsername ?? "");
          const r = await this.model.setNewMessage(myId.id, userId.id, message);
          const response = dataDBAForData(r, myId.id.toString(), myUsername || "", username);
          socket.emit(`${socket.id}${username}sendedMessage`, response);
          if (userId) {
            const userSendedToken = this.dbSocket.findUserTokenByUsername(username);
            if (userSendedToken) {
              socket.to(userSendedToken.getIdToken()).emit(`${userSendedToken.getIdToken()}${myUsername}recivedMessage`, response);
              socket.to(userSendedToken.getIdToken()).emit(`${userSendedToken.getIdToken()}CurrierChat`, response);
            }
          }
        } catch (error) {}
      });

      socket.on("getProfile", async (data: { search: string }) => {
        const profiles = await this.model.getProfileByNameOrUsername(data.search);
        this.io.emit(`${socket.id}getProfile${data.search}`, profiles);
      });

      socket.on("disconnect", () => {
        const user = this.dbSocket.findUserTokenByToken(socket.id);
        this.io.emit(`${user?.getUsername()}Online`, false);
      });
    });
  }
}
