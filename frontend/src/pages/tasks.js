import { HedaerTasks } from "../components/Header.tasks";
export const listTasks = async () => {
  const mainTasks = document.createElement("div");
  mainTasks.append(await HedaerTasks());
  return mainTasks;
};
