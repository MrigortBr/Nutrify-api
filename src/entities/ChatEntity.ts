type OllamaChunk = {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  done_reason: string;
  context: number[];
};

type OllamaHistoryEntry = {
  role: "user" | "assistant";
  content: string;
};

export type Message = {
  id: number;
  user_id_one: number;
  user_id_two: number;
  message: string;
  created_at: string | Date;
  identifier_chat: string;
  read: boolean;
};

export function formatToOllamaHistory(messages: Message[]): OllamaHistoryEntry[] {
  return messages.map((msg) => ({
    role: msg.user_id_one === 1 ? "assistant" : "user",
    content: msg.message,
  }));
}
