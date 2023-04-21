import jwt from "jsonwebtoken";
import User from "../models/User.js";

const checkAuth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  let token;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.data).select(
        "-password -confirmed -token -createdAt -updatedAt -__v"
      );
    } catch (error) {
      return res.status(404).json({ msg: "No autorizado" });
    }
  }

  if (!token) {
    const error = new Error("Token no válido");
    return res.status(401).json({ msg: error.message });
  }
  return next();
};

export default checkAuth;
