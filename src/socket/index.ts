import { Server as SocketIOServer } from "socket.io";
import http, { Server } from "http";
import { DbSocket, UserToken } from "../entities/usernameToken";
import SocketModel from "./model";
import { dataDBAForData } from "./types";
import IaService, { addNotification } from "./service";

export class Socket {
  private server: Server;
  public io: SocketIOServer;
  public dbSocket: DbSocket = new DbSocket();
  public model: SocketModel = new SocketModel();
  public service: IaService = new IaService();

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

      socket.on("userIsOnlineNutri", async (data: { nutriId: string; username: string }) => {
        const r = await this.model.getUsernameForNutrId(data.nutriId);
        if (r) {
          data.username = r;
          const user = this.dbSocket.findUserTokenByUsername(data.username);
          socket.emit(`${data.nutriId}OnlineNutri`, { online: user ? true : false, username: r });
        }
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

      socket.on("getHistoryNutri", async (data: { username: string }) => {
        try {
          const { username } = data;
          const userId = await this.model.getIdByUsername(username);
          const myUsername = this.dbSocket.findUserTokenByToken(socket.id)?.getUsername();
          const myId = await this.model.getIdByUsername(myUsername || "");
          const r = await this.model.getHistoryNutri(myId.id, userId.id);
          const response = dataDBAForData(r, myId.id.toString(), myUsername || "", username);
          socket.emit(`${socket.id}${username}getHistoryNutri`, response);
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
          }
        } catch (error) {
          //console.log(error);
        }
      });

      socket.on("sendMessage", async (data: { username: string; message: string }) => {
        try {
          const { username, message } = data;
          if (username == "Nutrify") {
            const userId = 1;
            const myUsername = this.dbSocket.findUserTokenByToken(socket.id)?.getUsername();
            const myId = await this.model.getIdByUsername(myUsername ?? "");
            const r = await this.model.setNewMessage(myId.id, userId, message);
            const response = dataDBAForData(r, myId.id.toString(), myUsername || "", username);
            socket.emit(`${socket.id}${username}sendedMessage`, response);
            socket.emit(`${socket.id}Nutrify`, { change: true });
            const history = await this.model.getHistoryForIA(myId.id);
            const messageIa = await this.service.sendMessage(message, history);
            const rIa = await this.model.setNewMessage(userId, myId.id, messageIa);

            socket.emit(`${socket.id}${username}recivedMessage`, [
              {
                id: rIa[0].id,
                myname: myUsername,
                nameuser: username,
                message: messageIa,
                created_at: new Date(),
                read: false,
                mymessage: false,
              },
            ]);
            //socket.emit(`${socket.id}CurrierChat`, response);
            socket.emit(`${socket.id}Nutrify`, { change: false });
          } else {
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
                socket
                  .to(userSendedToken.getIdToken())
                  .emit(`${userSendedToken.getUsername()}notification`, { message: "Você recebeu uma mensagem nova!" });
              }
            }
          }
        } catch (error) {}
      });

      socket.on("sendMessageNutri", async (data: { username: string; message: string }) => {
        try {
          const { username, message } = data;
          const userId = await this.model.getIdByUsername(username);
          const myUsername = this.dbSocket.findUserTokenByToken(socket.id)?.getUsername();
          const myId = await this.model.getIdByUsername(myUsername ?? "");
          const r = await this.model.setNewMessageNutri(myId.id, userId.id, message);
          const response = dataDBAForData(r, myId.id.toString(), myUsername || "", username);
          socket.emit(`${socket.id}${username}sendedMessageNutri`, response);
          if (userId) {
            const userSendedToken = this.dbSocket.findUserTokenByUsername(username);
            if (userSendedToken) {
              socket.to(userSendedToken.getIdToken()).emit(`${userSendedToken.getIdToken()}${myUsername}recivedMessageNutri`, response);
              socket.to(userSendedToken.getIdToken()).emit(`${userSendedToken.getIdToken()}CurrierChatNutri`, response);
            }
          }
        } catch (error) {}
      });

      socket.on("getProfile", async (data: { search: string }) => {
        const profiles = await this.model.getProfileByNameOrUsername(data.search);
        this.io.emit(`${socket.id}getProfile${data.search}`, profiles);
      });

      socket.on(
        "finishNutri",
        async (data: { id: number; finishService: boolean; rating: number; description: string; nutriId: string; username: string }) => {
          try {
            await this.model.finishNutri(data.id, data.finishService, data.rating, data.description, data.nutriId);
            const userSendedToken = this.dbSocket.findUserTokenByUsername(data.username);
            if (userSendedToken) {
              socket.to(userSendedToken.getIdToken()).emit(`${data.id}finished`);
            }
          } catch (error) {
            console.log("ERRRRRRO");
          }
        },
      );

      socket.on("getRating", async (data: { id: number }) => {
        try {
          const response = await this.model.getRatingById(data.id);
          socket.emit(`${socket.id}reciveRating`, response);
        } catch (error) {
          console.log(error);
        }
      });

      socket.on("disconnect", () => {
        const user = this.dbSocket.findUserTokenByToken(socket.id);
        this.io.emit(`${user?.getUsername()}Online`, false);
      });

      socket.on("follow", (data: { username: string }) => {
        const tokenID = this.dbSocket.findUserTokenByUsername(data.username);
        const myToken = this.dbSocket.findUserTokenByToken(socket.id);
        if (myToken) {
          if (tokenID) {
            socket
              .to(tokenID.getIdToken())
              .emit(`${data.username}notification`, { message: `@${myToken.getUsername()} começou a seguir você!` });
          }
          addNotification(data.username, myToken.getUsername(), "profile", "", `@${myToken.getUsername()} começou a seguir você!`);
        }
      });

      socket.on("like", (data: { username: string; link: string }) => {
        const tokenID = this.dbSocket.findUserTokenByUsername(data.username);
        const myToken = this.dbSocket.findUserTokenByToken(socket.id);
        if (myToken) {
          if (tokenID) {
            socket
              .to(tokenID.getIdToken())
              .emit(`${data.username}notification`, { message: `@${myToken?.getUsername()} curtiu sua foto!` });
          }
          addNotification(data.username, myToken.getUsername(), "post", data.link, `@${myToken?.getUsername()} curtiu sua foto!`);
        }
      });

      socket.on("comment", (data: { username: string; link: string }) => {
        const tokenID = this.dbSocket.findUserTokenByUsername(data.username);
        const myToken = this.dbSocket.findUserTokenByToken(socket.id);
        if (myToken) {
          if (tokenID) {
            socket
              .to(tokenID.getIdToken())
              .emit(`${data.username}notification`, { message: `@${myToken?.getUsername()} comentou na sua foto!` });
          }
          addNotification(data.username, myToken.getUsername(), "post", data.link, `@${myToken?.getUsername()} comentou na sua foto!`);
        }
      });

      socket.on("getNotification", async () => {
        const myToken = this.dbSocket.findUserTokenByToken(socket.id);
        if (myToken) {
          const myId = await this.model.getIdByUsername(myToken.getUsername());
          const response = await this.model.getNotification(myId.id);
          socket.emit("sendNotification", response);
          await this.model.readAll(myId.id);
        }
      });
    });
  }
}
