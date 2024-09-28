import Router from "express";
import validatorJWT from "../middlewares/validatorJWT.js";
const routerUser = Router();
import { closeSession, login, register, session } from "../controllers/auth.controller.js";

routerUser.post("/register", register);
routerUser.get("/session", validatorJWT, session);
routerUser.post("/login", login);
routerUser.post("/logout", closeSession);

export default routerUser;
