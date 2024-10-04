export const HedaerTasks = async () => {
  const session = await fetch("http://localhost:4000/auth/session", {
    credentials: "include",
  });
  const response = await session.json();
  console.log(response);

  const $header = document.createElement("header");
  $header.classList.add("flex", "flex-row", "bg-blue-400", "justify-between", "h-14", "items-center", "px-8");
  const $title = document.createElement("h1");
  $title.classList.add("font-bold", "text-2xl");
  $title.textContent = "Panel de tareas";
  if (session.ok) {
    const $link = document.createElement("button");
    $link.textContent = "cerrar session";
    $link.addEventListener("click", async () => {
      const logout = await fetch("http://localhost:4000/auth/logout", {
        credentials: "include",
      });
      if (logout.ok) {
        window.location.reload();
      }
    });
  } else {
    window.location.href = "http://localhost:5173/login";
  }
  $header.append($title);
  return $header;
};
