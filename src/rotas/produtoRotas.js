import express from "express";

import Controller from "../controllers/ProdutoController.js";
import upload from "../middlewares/UploadImageMiddleware.js";
import auth from "../middlewares/AuthMiddleware.js";
import validation from "../validations/produtoValidation.js";

const router = express.Router();

router
    .get("/", auth.autenticar, Controller.listar)
    .get("/:id", auth.autenticar, Controller.buscarPorId)
    .post("/", auth.autenticarAdm, upload.single("foto"), validation, Controller.criar)
    .put("/:id", auth.autenticarAdm, upload.single("foto"), validation, Controller.atualizar)
    .delete("/:id", auth.autenticarAdm, Controller.excluir);

export default router;