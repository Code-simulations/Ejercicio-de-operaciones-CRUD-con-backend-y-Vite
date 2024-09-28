import jwt from "jsonwebtoken";
import db from "../db/database.js";
export default async (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) return res.status(404).json({ message: "no tiene autorización para estar en esta zona" });

  const decoded = jwt.verify(token, "secret-key");

  const connection = await db();

  const [[user]] = await connection.query("SELECT * FROM `users`WHERE id = ?", decoded.id);

  if (!user) return res.status(404).json({ message: "su tiempo de autorización ya expiro" });

  req.user = user;

  next();
};
