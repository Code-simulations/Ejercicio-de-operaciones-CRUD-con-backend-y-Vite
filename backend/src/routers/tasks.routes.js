import Router from "express";
import { taskCreator, taskGetter, taskGetterById, taskKiller, taskUpdater } from "../controllers/tasks.controllers.js";
import validatorJWT from "../middlewares/validatorJWT.js";
const tasksRouter = Router();
tasksRouter.get("/", validatorJWT, taskGetter);
tasksRouter.post("/", validatorJWT, taskCreator);
tasksRouter.get("/:id", validatorJWT, taskGetterById);
tasksRouter.put("/:id", validatorJWT, taskUpdater);
tasksRouter.delete("/:id", validatorJWT, taskKiller);

export default tasksRouter;
