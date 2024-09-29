import { mainRegister } from "../components/form.register.js";
import { HeaderRegister } from "../components/header.register.js";
export const Register = () => {
  const $register = document.createElement("div");
  $register.classList.add("h-full");
  $register.append(HeaderRegister(), mainRegister());
  return $register;
};
