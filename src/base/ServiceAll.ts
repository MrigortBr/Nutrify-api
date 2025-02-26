import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

export function isValidEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
