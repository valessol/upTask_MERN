import User from "../models/User.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";

export const getUsers = async (req, res) => {};

export const register = async (req, res) => {
  const { email } = req.body;
  const existUser = await User.findOne({ email });

  if (existUser) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const user = new User(req.body);
    user.token = generateId(); // este token es de confirmación de mail del usuario. Una vez confirmado, el token se resetea a ""
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  if (!user.confirmed) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  const isCheckedPassword = await user.checkPassword(password);
  if (isCheckedPassword) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id), // este token no se guarda en ningun lado, es de autenticación, se envía a frontend
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

export const checkAccountVerificationToken = async (req, res) => {
  const { token } = req.params;
  const confirmedUser = await User.findOne({ token });

  if (!confirmedUser) {
    const error = new Error("Token no válido");
    return res.status(403).json({ msg: error.message });
  }

  try {
    confirmedUser.confirmed = true;
    confirmedUser.token = "";
    await confirmedUser.save();
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  try {
    user.token = generateId(); // este token se regenera para que el usuario pueda volver a generar su clave
    await user.save();
    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

export const checkNewAccountVerificationToken = async (req, res) => {
  const { token } = req.params;
  const validUser = await User.findOne({ token });

  if (validUser) {
    res.json({ msg: "Token válido, el usuario existe" });
  } else {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }
};

export const createNewPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const validUser = await User.findOne({ token });

  if (validUser) {
    validUser.password = password;
    validUser.token = "";
    try {
      await validUser.save();
      res.json({ msg: "Password modificado correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }
};

export const getProfile = async (req, res) => {
  const { user } = req;

  res.json(user);
};
