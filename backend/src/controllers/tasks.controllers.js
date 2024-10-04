import db from "../db/database.js";
import color from "chalk";

export const taskGetter = async (req, res) => {
  try {
    const idUser = req.user.id;

    const connection = await db();

    const sql = "SELECT * FROM `tasks` WHERE creator = ?";

    const [rows] = await connection.query(sql, idUser);

    res.status(200).json(rows);
  } catch (error) {
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log(color.red("Error al traer las tareas "));
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log();
    console.log(error);
    console.log();
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    res.status(500).json({ message: "Error inesperado" });
  }
};

export const taskCreator = async (req, res) => {
  try {
    const idUser = req.user.id;

    const { title, description, status } = req.body;

    const connection = await db();

    const sql = "INSERT INTO `tasks`(`title`, `description`, `isComplete`,`creator`) VALUES (?,?,?,?)";

    const [rows] = await connection.query(sql, [title, description, status, idUser]);

    if (!rows) return res.status(404).json({ message: "no se pudo realizar la tarea" });

    res.status(201).json({ message: "se a creado la tarea con éxito" });
  } catch (error) {
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log(color.red("Error al crear la tarea"));
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log();
    console.log(error);
    console.log();
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    res.status(500).json({ message: "Error inesperado" });
  }
};

export const taskGetterById = async (req, res) => {
  try {
    const idUser = req.user.id;

    const { id } = req.params;

    const connection = await db();

    const [[searchTasks]] = await connection.query("SELECT * FROM `tasks`WHERE id = ? AND creator = ?", [id, idUser]);

    const wasFound = Boolean(searchTasks);

    if (!wasFound) return res.status(404).json({ message: "no se encontró la tarea" });

    res.status(200).json(searchTasks);
  } catch (error) {
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log(color.red("Error al buscar la tarea"));
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log();
    console.log(error);
    console.log();
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    res.status(500).json({ message: "Error inesperado" });
  }
};

export const taskUpdater = async (req, res) => {
  try {
    const idUser = req.user.id;

    const { id } = req.params;

    const { title, description, status } = req.body;

    const connection = await db();

    const updateQuery = "UPDATE `tasks` SET `title`=?,`description`=?,`isComplete`= ? WHERE `id`=? AND `creator` = ? ";

    const searchQuery = "SELECT * FROM `tasks`WHERE id = ? AND `creator` = ?";

    const [[taskFound]] = await connection.query(searchQuery, [id, idUser]);

    const wasFound = Boolean(taskFound);

    if (!wasFound) return res.status(404).json({ message: "no hay tarea para actualizar " });

    const updatedTask = await connection.query(updateQuery, [title, description, status, id, idUser]);

    const wasUpdated = Boolean(updatedTask);

    if (!wasUpdated) return res.status(400).json({ message: "no se a podido actualizar la tarea" });

    res.status(202).json({ message: "se actualizado la tarea correctamente" });
  } catch (error) {
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log(color.red("Error al actualizar la tarea"));
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log();
    console.log(error);
    console.log();
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
  }
};

export const taskKiller = async (req, res) => {
  try {
    const idUser = req.user.id;

    const { id } = req.params;

    const connection = await db();

    const searchQuery = "SELECT * FROM `tasks`WHERE `id` = ? AND `creator` = ?";

    const [[taskFound]] = await connection.query(searchQuery, [id, idUser]);

    const wasFound = Boolean(taskFound);

    if (!wasFound) return res.status(404).json({ message: "tarea no encontrada para eliminar " });

    const deleteQuery = "DELETE FROM `tasks` WHERE `id`= ? AND `creator` = ?";

    const [taskDeleted] = await connection.query(deleteQuery, [id, idUser]);

    const wasDeleted = Boolean(taskDeleted);

    if (!wasDeleted) return res.status(400).json({ message: "no se a podido eliminar la tarea " });

    res.status(200).json({ message: "tarea eliminada correctamente " });
  } catch (error) {
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log(color.red("Error al eliminar la tarea"));
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    console.log();
    console.log(error);
    console.log();
    console.log(color.blue("----------------------------------------------------------------------------------------------------"));
    res.status(500).json({ message: "Error inesperado al eliminar la tarea " });
  }
};
