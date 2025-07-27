import { DECRYPT_SALT_SIZE } from '@shared/constants';
import * as bcrypt from 'bcrypt';

export const genSalt = async () => {
  return await bcrypt.genSalt(DECRYPT_SALT_SIZE);
};

export const encrypt = async (plainText: string): Promise<string> => {
  const salt = await genSalt();
  return await bcrypt.hash(plainText, salt);
};

export const compare = async (
  plainText: string,
  hashedText: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainText, hashedText);
};
