import crypto from "crypto";

export const generateUniqueCode = (stringLength: number) => {
  return crypto
    .randomBytes(3)
    .toString("hex")
    .substring(0, stringLength)
    .toUpperCase();
};
