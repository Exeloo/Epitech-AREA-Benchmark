import * as crypto from "crypto";

export const generateKey = (size = 50) => {
  const buffer = crypto.randomBytes(size);
  return buffer.toString("base64").substring(0, size);
};
