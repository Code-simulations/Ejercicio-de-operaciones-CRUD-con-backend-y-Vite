import mysql from "mysql2/promise";
import color from "chalk";

const db = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "prueva",
      port: 3306,
    });
    return connection;
  } catch (error) {
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log();
    console.log(color.red("                              error en la conexión de la base de datos"));
    console.log();
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log();
    console.log(error);
    console.log();
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
  }
};
async function validator() {
  const connection = await db();
  const [rows] = await connection.query("SELECT 1 + 1 AS solution");
  const valid = Boolean(rows);
  if (valid) {
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log(color.green("                                    connection is successfully"));
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
  }
}
validator();
export default db;
