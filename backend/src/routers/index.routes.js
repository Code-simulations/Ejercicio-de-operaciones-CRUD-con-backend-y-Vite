import Router from "express";
const routerUser = Router();
import { login, register } from "../controllers/auth.controlles.js";

routerUser.post("/register", register);
routerUser.get("/session");
routerUser.post("/login", login);
routerUser.post("/logout");

export default routerUser;
