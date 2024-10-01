import express from "express";
import cors from "cors";
import morgan from "morgan";
import routerUser from "./routers/auth.routes.js";
import cookieParser from "cookie-parser";
import color from "chalk";
import tasksRouter from "./routers/tasks.routes.js";
const app = express();
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/auth", routerUser);
app.use("/tasks", tasksRouter);

app.listen(4000, () => {
  console.log(color.blue("----------------------------------------------------------------------------------------------------"));
  console.log(color.green("                            server is running in http://localhost:4000"));
  console.log(color.blue("----------------------------------------------------------------------------------------------------"));
});
