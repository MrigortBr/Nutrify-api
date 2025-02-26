import { ReturnResponse } from "../../base/responsesData";
import { UserPrivacy } from "../../entities/ConfigEntity";
import ProfileUser from "../../entities/ProfileUser";
import { SimpleProfile } from "../../entities/SimpleProfile";

export type responseProfile = {
  message: string;
  description: string;
  profile?: ProfileUser;
  simpleProfile?: SimpleProfile;
  privacy?: UserPrivacy;
  statusCode: number;
};

export const returnResponse: ReturnResponse<responseProfile> = {
  PC_PR_PFS: { message: "Perfil encontrado!", description: "", statusCode: 200 }, //Profile controller - Project Response - Profile Finded Sucess
  PC_PR_PUS: { message: "Perfil atualizado com sucesso!", description: "", statusCode: 200 }, //Profile controller - Project Response - Profile Updated Sucess
  PC_PR_PCS: { message: "Dados de privacidade encontrados!", description: "", statusCode: 200 }, //Profile controller - Project Response - Profile Config Sucess
  PC_PR_PCU: { message: "Dados de privacidade atualizados!", description: "", statusCode: 200 }, //Profile controller - Project Response - Profile Config Updated
};
