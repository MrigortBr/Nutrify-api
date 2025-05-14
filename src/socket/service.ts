import { Response, NextFunction } from "express";
import axios from "axios";
import { formatToOllamaHistory, Message } from "../entities/ChatEntity";
import SocketModel from "./model";

type OllamaChunk = {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  done_reason: string;
  context: number[];
  message: {
    role: string;
    content: string;
  };
};

export default class IaService {
  async sendMessage(message: string, history: Message[]) {
    const prompt = message;

    const historyFormat = formatToOllamaHistory(history);

    const response = await axios.post("http://localhost:11434/api/chat", {
      model: "mymodel",
      messages: historyFormat,
      stream: true,
    });

    const chunks = this.parseOllamaStream(response.data);

    const responseString = this.generateResponse(chunks);

    return responseString;
  }

  private parseOllamaStream(streamText: string): OllamaChunk[] {
    return streamText
      .trim()
      .split("\n") // separa cada linha
      .map((line) => JSON.parse(line)); // transforma em objeto
  }

  private generateResponse(data: OllamaChunk[]): string {
    let response = "";

    data.forEach((r) => (response = response + r.message.content));

    return response;
  }
}

export async function addNotification(
  username: string,
  myUsername: string,
  type: "chat" | "post" | "profile",
  link: string,
  message: string,
) {
  try {
    const model = new SocketModel();
    const myid = await model.getIdByUsername(username);
    const idOne = await model.getIdByUsername(myUsername);

    await model.addNotification(idOne.id, myid.id, type, link, message);
  } catch (erro) {
    console.log(erro);
  }
}
