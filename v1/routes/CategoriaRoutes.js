import express from "express";
import {
    createCategoria,
    getAllCategorias,
    getCategoriaById,
    topCategorias,
    deleteCategoria
} from "../controllers/categoriaController.js";

import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { createCategoriaSchema } from "../validators/categoria.validator.js";

const router = express.Router();

// Crear categoría (validación)
router.post(
    "/",
    validateBodyMiddleware(createCategoriaSchema),
    createCategoria
);

// Obtener todas
router.get("/", getAllCategorias);

// Top categorías
router.get("/top", topCategorias);

// Obtener por ID
router.get("/:id", getCategoriaById);

// Eliminar
router.delete("/:id", deleteCategoria);

export default router;