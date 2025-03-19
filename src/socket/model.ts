import { Knex } from "knex";
import DatabaseConnection from "../data/connection";
import { dataHistoryDBA, searchProfileResponse } from "./types";
import { User } from "../entities/users";

function getMinMax(num1: number, num2: number): string {
  const menorNumero = Math.min(num1, num2);
  const maiorNumero = Math.max(num1, num2);
  return `${menorNumero},${maiorNumero}`;
}

export default class SocketModel {
  private db: Knex;

  constructor() {
    this.db = DatabaseConnection.getInstance();
  }

  async getIdByUsername(username: string): Promise<{ id: number }> {
    try {
      return await this.db("users").select("id").where("username", username).first();
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async setNewMessage(user_id_one: number, user_id_two: number, message: string): Promise<dataHistoryDBA[]> {
    try {
      return await this.db("user_message_user")
        .insert({ user_id_one, user_id_two, message, identifier_chat: getMinMax(user_id_one, user_id_two) })
        .returning("*");
    } catch (error) {
      console.log(error);
      throw new Error("PE-UNKW");
    }
  }

  async getHistory(user_id_one: number, user_id_two: number): Promise<dataHistoryDBA[]> {
    try {
      return await this.db("user_message_user")
        .select("*")
        .where({ user_id_one, user_id_two })
        .orWhere({ user_id_one: user_id_two, user_id_two: user_id_one });
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async getMyNewChat(userId: number, myId: number): Promise<string> {
    try {
      const { picture }: { picture: string } = await this.db("users").select("picture").where({ id: userId }).first();
      return picture;
    } catch (e) {
      return "";
    }
  }

  async readMessages(user_id_one: number, user_id_two: number) {
    try {
      await this.db("user_message_user").update({ read: true }).where({ user_id_one, user_id_two });
    } catch (e) {
      return "";
    }
  }

  async getMyChats(userIdRequester: number): Promise<any[]> {
    try {
      const chats_identifier: { identifier_chat: string }[] = await this.db("user_message_user")
        .select("identifier_chat")
        .where({ user_id_one: userIdRequester })
        .orWhere({ user_id_two: userIdRequester })
        .groupBy("identifier_chat");

      const promises = chats_identifier.map(async (v) => {
        const result = await this.db("user_message_user")
          .where("identifier_chat", v.identifier_chat)
          .orderBy("created_at", "desc")
          .select("message", "created_at")
          .limit(1)
          .first();

        const idTo =
          v.identifier_chat.split(",")[0] == userIdRequester.toString() ? v.identifier_chat.split(",")[1] : v.identifier_chat.split(",")[0];

        const user = await this.db("users").select("username", "picture").where("id", idTo).first();

        const noRead = await this.db("user_message_user")
          .where("user_id_one", idTo)
          .andWhere("user_id_two", userIdRequester)
          .andWhere("read", false);

        result.user = user;
        result.noRead = noRead.length;

        return result;
      });

      const lastChats = await Promise.all(promises);

      return lastChats;
    } catch (error) {
      throw new Error("PE-UNKW");
    }
  }

  async getProfileByNameOrUsername(name: string): Promise<searchProfileResponse[]> {
    try {
      const response: searchProfileResponse[] = await this.db("users")
        .select("picture", "username", "name")
        .where("username", "like", `%${name}%`)
        .orWhere("name", "like", `%${name}%`);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
