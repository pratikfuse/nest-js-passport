import { randomBytes, scryptSync } from 'crypto';


export const genRandomString = function (): string {
  return randomBytes(16).toString('hex');
};

export const createHash = function (password: string, salt: string) {
  return scryptSync(password, salt, 64).toString('hex');
};

export function saltHashPassword(userpassword: string) {
  const salt = genRandomString();
  const hash = createHash(userpassword, salt);

  return `${salt}:${hash}`;
}
