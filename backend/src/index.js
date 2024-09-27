import express from "express";
import cors from "cors";
import morgan from "morgan";
import routerUser from "./routers/index.routes.js";
import cookieParser from "cookie-parser";
import color from "chalk";
const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(routerUser);

app.listen(4000, () => {
  console.log(color.blue("----------------------------------------------------------------------------------------------------"));
  console.log(color.green("                            server is running in http://localhost:4000"));
  console.log(color.blue("----------------------------------------------------------------------------------------------------"));
});
