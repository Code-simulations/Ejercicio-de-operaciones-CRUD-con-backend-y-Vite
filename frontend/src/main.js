import "./assets/style/style.css";
import { Register } from "./pages/register.js";
const params = window.location.pathname;

const $index = document.querySelector("#app");

switch (params) {
  case "/register":
    $index.appendChild(Register());
    break;
  case "/login":
    $index.innerHTML = `<h1>LOGIN</h1>`;
    break;
  case "/tasks":
    $index.innerHTML = `<h1>TASKS</h1>`;
    break;

  default:
    break;
}
