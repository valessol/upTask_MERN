import crypto from "crypto";

const generateId = () => {
  return crypto.randomUUID();
};

export default generateId;
