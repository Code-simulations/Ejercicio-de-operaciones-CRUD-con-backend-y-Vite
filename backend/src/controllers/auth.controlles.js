import bcrypt from "bcrypt";
import color from "chalk";
import db from "../db/database.js";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
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
    console.log(user);
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
