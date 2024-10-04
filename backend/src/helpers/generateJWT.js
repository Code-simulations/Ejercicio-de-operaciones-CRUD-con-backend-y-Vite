import jwt from "jsonwebtoken";
export default (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(payload, "secret-key", { expiresIn: "20h" }, (error, token) => {
      if (error) {
        console.log(error);
        reject("No se pudo generar el token ");
      } else {
        resolve(token);
      }
    });
  });
};
