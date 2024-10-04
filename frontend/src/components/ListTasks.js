import Swal from "sweetalert2";

export const ListTasks = () => {
  const $mainTasks = document.createElement("div");
  $mainTasks.classList.add("h-full", "flex", "w-full", "h-5/6");

  const $tasks = document.createElement("div");
  $tasks.classList.add("bg-blue-100", "h-full", "w-1/2", "flex", "items-center", "flex-col", "overflow-y-auto");
  $tasks.innerHTML = "<h1 class='font-bold text-2xl mb-4'>Tareas</h1>";

  const fromtasks = document.createElement("div");
  fromtasks.classList.add("bg-blue-100", "h-full", "w-1/2", "flex", "justify-center");

  fromtasks.innerHTML = `
    <form id="tasks-form" class='h-1/2 bg-blue-300 flex flex-col p-8 rounded-xl relative top-28'>
      <input type="text" id='title' class="border my-8 rounded-xl text-center text-black" placeholder="Titulo" />
      <input type="text" id='descriptions' class="border my-/ rounded-xl text-center text-black" placeholder="Descripción" />
      <input type="checkbox" id='check' class='flex relative -left-16 my-4' />
      <button type="submit" class='bg-black text-white rounded-xl'>Crear</button>
    </form>`;

  const deleteTasks = async (taskId) => {
    try {
      const singDelete = await fetch(`http://localhost:4000/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const res = await singDelete.json();
      console.log(res);
      getAllTasks();
    } catch (error) {
      console.error("Error al eliminar la tarea", error);
    }
  };

  const getAllTasks = async () => {
    const reqTasks = await fetch("http://localhost:4000/tasks/", { credentials: "include" });
    const tasks = await reqTasks.json();
    console.log(tasks);

    $tasks.innerHTML = "<h1 class='font-bold text-2xl mb-4'>Tareas</h1>";
    tasks.forEach((element) => {
      const taskElement = document.createElement("div");
      taskElement.classList.add("rounded", "border-black", "border", "bg-indigo-50", "w-3/5", "h-48", "flex", "flex-col", "items-center", "rounded-3xl", "mb-4", "p-4");

      taskElement.innerHTML = `
        <h1 class="text-2xl font-bold">${element.title}</h1>
        <div class='flex w-full h-full'>
          <div class='flex w-full h-full flex-col justify-between'>
            <p class="text-lg w-full p-2">${element.description}</p>
            <p>${element.isComplete ? "Completada" : "Pendiente"}</p>
          </div>
          <div class='w-22 flex flex-col justify-center'>
            <button id='btn-dtl-${element.id}' class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-4">Eliminar</button>
            <button id='btn-${element.id}' class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Editar</button>
          </div>
        </div>`;

      // Añadir evento de eliminación directamente aquí
      const deleteButton = taskElement.querySelector(`#btn-dtl-${element.id}`);
      deleteButton.addEventListener("click", () => deleteTasks(element.id));

      $tasks.appendChild(taskElement);
    });
  };

  getAllTasks();

  fromtasks.addEventListener("submit", async (e) => {
    try {
      e.preventDefault();
      const title = document.getElementById("title").value;
      const description = document.getElementById("descriptions").value;
      const check = document.getElementById("check").checked;

      const postTasks = await fetch("http://localhost:4000/tasks/", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title, description: description, status: check }),
      });

      const data = await postTasks.json();

      await Swal.fire({
        title: "Tarea creada con éxito",
        text: data.message || "Tarea creada con éxito",
        icon: "success",
        confirmButtonText: "OK",
        backdrop: false,
      });
      getAllTasks(); // Refresca la lista de tareas después de crear
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: "Hubo un problema para crear la tarea",
        icon: "error",
        confirmButtonText: "OK",
        backdrop: false,
      });
    }
  });

  $mainTasks.append(fromtasks, $tasks);
  return $mainTasks;
};
