import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

type KeyVerify = { id: number; name: string; email: string; iat: number, type: "user" | "nutri"};

export async function hashPasswordByPassword(password: string) {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    throw new Error("PWD INVALID");
  }
}

export async function generateKeyJWT(id: number) {
  try {
    const token = jwt.sign({ id: id }, process.env.JWTKEY || "PRIVATE KEY");
    if (token == undefined) throw new Error("PE-NPGJ");
    return token;
  } catch (error) {
    throw new Error("PE-NPGJ");
  }
}

export async function generateKeyVerify(id: number, name: string, email: string, type: "user" | "nutri") {
  try {
    const token = jwt.sign({ id: id, name: name, email: email, type: type}, process.env.JWTKEY || "PRIVATE KEY");
    if (token == undefined) throw new Error("PE-NPGJ");
    return token;
  } catch (error) {
    throw new Error("PE-NPGJ");
  }
}

export async function decodeKeyVerify(jwtKey: string): Promise<KeyVerify> {
  try {
    const decode = (await jwt.decode(jwtKey)) as KeyVerify | null;

    if (!decode) throw new Error("PE-NLTA");
    return decode;
  } catch (error) {
    throw new Error("PE-CIVL-PW");
  }
}

export function isValidEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
