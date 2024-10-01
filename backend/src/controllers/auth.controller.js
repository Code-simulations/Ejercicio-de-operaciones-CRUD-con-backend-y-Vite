import bcrypt from "bcrypt";
import color from "chalk";
import db from "../db/database.js";
import generateJWT from "../helpers/generateJWT.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const conexión = await db();
    await conexión.query("INSERT INTO `users`(`username`, `email`, `password`) VALUES (?,?,?)", [name, email, hashedPassword]);
    res.status(200).json({ message: "register successfully" });
  } catch (error) {
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log(color.red("                             Error en el controlador de registros"));
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log(error);
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    res.status(500).json({
      message: "Error inesperado por favor intente mas tarde ",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const connection = await db();

    const [[user]] = await connection.query("SELECT * FROM `users` WHERE `email` = ?", email);

    if (!user) return res.status(404).json({ message: "no se encontró el usuario " });

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) return res.status(404).json({ message: "contraseña incorrecta" });

    const token = await generateJWT(user.id);

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    });
    return res.status(200).json({
      message: "inicio de sesión exitosos ",
    });
  } catch (error) {
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log(color.red("                                   Error en el controlador del login"));
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log();
    console.log(error);
    console.log();
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    res.status(500).json({
      message: "error inesperado por favor intente mas tarde ",
    });
  }
};

export const session = (req, res) => {
  res.status(200).json({ message: "Acceso concedido al area restringida", user: req.user });
};

export const closeSession = (req, res) => {
  try {
    res.clearCookie("authToken");
    return res.json({ message: "se a cerrado la sesión " });
  } catch (error) {
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log(error);
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
  }
};
