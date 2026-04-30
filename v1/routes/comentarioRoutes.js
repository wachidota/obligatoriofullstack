import express from "express";
import {
    createComentario,
    getComentarioById,
    deleteComentario
} from "../controllers/comentarioController.js";

import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { createComentarioSchema } from "../validators/comentario.validator.js";

const router = express.Router({ mergeParams: true });

// Crear comentario
router.post(
    "/",
    validateBodyMiddleware(createComentarioSchema),
    createComentario
);

// Obtener comentario
router.get("/:id", getComentarioById);

// Eliminar comentario
router.delete("/:id", deleteComentario);

export default router;