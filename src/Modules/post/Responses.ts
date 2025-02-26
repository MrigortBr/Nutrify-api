import { ReturnResponse } from "../../base/responsesData";
import { Post } from "../../entities/Post";
import ProfileUser, { picture } from "../../entities/ProfileUser";
import { SimplePost } from "../../entities/SimplePost";

export type responsePost = {
  message: string;
  description: string;
  statusCode: number;
  post?: Post;
  simplePost?: SimplePost | SimplePost[];
  picture?: picture | picture[];
};

export const returnResponse: ReturnResponse<responsePost> = {
  PC_PR_PCS: { message: "Foto publicada com sucesso!", description: ".", statusCode: 200 }, //Authenticate controller - Project Response - Post Created sucess
  PC_PR_PLS: { message: "Foto listada com sucesso!", description: ".", statusCode: 200 }, //Authenticate controller - Project Response - Post Created sucess
  PC_PR_PDS: { message: "Post deletado!", description: ".", statusCode: 200 }, //Authenticate controller - Project Response - Post Deleted sucess
  PC_PR_PUS: { message: "Post atualizado!", description: ".", statusCode: 200 }, //Authenticate controller - Project Response - Post Updated sucess
  PC_PR_PLI: { message: "Post curtido!", description: ".", statusCode: 200 }, //Authenticate controller - Project Response - Post lIKED sucess
  PC_PR_PCC: { message: "Post Comentado!", description: ".", statusCode: 200 }, //Authenticate controller - Project Response - Post Comment Create
};
