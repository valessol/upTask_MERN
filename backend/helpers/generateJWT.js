import jwt from "jsonwebtoken";

const generateJWT = (data) => {
  return jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateJWT;
