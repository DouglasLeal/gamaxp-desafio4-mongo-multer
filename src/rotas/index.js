import express from "express";

import authRotas from "./authRotas.js";
import usuarioRotas from "./usuarioRotas.js";
import categoriaRotas from "./categoriaRotas.js";

const routes = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/", authRotas);
    app.use("/usuarios", usuarioRotas);
    app.use("/categorias", categoriaRotas);
}

export default routes;