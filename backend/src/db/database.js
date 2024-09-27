import mysql from "mysql2/promise";
import color from "chalk";

const db = async () => {
  try {
    const conexión = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "prueva",
      port: 3306,
    });
    const valid = Boolean(conexión);
    if (valid) {
      console.log(color.blue("----------------------------------------------------------------------------------------------------"));
      console.log(color.green("                                    connection is successfully"));
      console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    }
    return conexión;
  } catch (error) {
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log();
    console.log(color.red("error en la conexión de la base de datos"));
    console.log();
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log();
    console.log(error);
    console.log();
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
  }
};
export default db;
