import { ReturnResponse } from "../../base/responsesData";
import { ListPost } from "../../entities/ListPostDTO";

export type CommentsResponse = {
  message: string;
  description: string;
  statusCode: number;
  comments?: ListPost;
};

export const returnResponse: ReturnResponse<CommentsResponse> = {
  CC_PR_CCS: { message: "Comentario registrado com sucesso!", description: ".", statusCode: 200 }, //Comments Controller - Project Response - Comments created sucess
  CC_PR_CDS: { message: "Comentario deletado com sucesso!", description: ".", statusCode: 200 }, //Comments Controller - Project Response - Comments deleted sucess
  CC_PR_CLS: { message: "Comentarios listados com sucesso!", description: ".", statusCode: 200 }, //Comments Controller - Project Response - Comments listed sucess
};
