import jwt from "jsonwebtoken";
import db from "../db/database.js";
import color from "chalk";
export default async (req, res, next) => {
  console.log(color.blue("---------------------------------token de las cookies-----------------------------------------------"));
  console.log(req.cookies);
  console.log(color.blue("----------------------------------------------------------------------------------------------------"));

  const token = req.cookies.authToken;

  if (!token) return res.status(404).json({ message: "no tiene autorización para estar en esta zona" });

  const decoded = jwt.verify(token, "secret-key");

  const connection = await db();

  const [[user]] = await connection.query("SELECT * FROM `users`WHERE id = ?", decoded.id);

  if (!user) return res.status(404).json({ message: "su tiempo de autorización ya expiro" });

  req.user = user;

  next();
};
