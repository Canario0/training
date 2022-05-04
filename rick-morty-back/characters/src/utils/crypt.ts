import bcrypt from "bcrypt";

export function hashPassword(plainPassword: string): Promise<string> {
  return bcrypt.hash(plainPassword, 10);
}

export function syncHashPassword(plainPassword: string): string {
  return bcrypt.hashSync(plainPassword, 10);
}

export function comparePassword(
  plainPassword: string,
  cryptPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, cryptPassword);
}
