import bcrypt from "bcryptjs";

export const hashPassword = async password => {
  return bcrypt.hash(password, 12);
};

export const verifyPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};
