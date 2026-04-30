import express from "express";
import {
    createCapitulo,
    getCapituloById,
    updateCapitulo,
    deleteCapitulo,
    getCapitulosAdyacentes,
    getComentariosByCapitulo
} from "../controllers/capituloController.js";

import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import {
    createCapituloSchema,
    updateCapituloSchema
} from "../validators/capitulo.validator.js";

const router = express.Router({ mergeParams: true });

// Crear capítulo
router.post(
    "/",
    validateBodyMiddleware(createCapituloSchema),
    createCapitulo
);

// Obtener capítulo
router.get("/:id", getCapituloById);

// Actualizar
router.put(
    "/:id",
    validateBodyMiddleware(updateCapituloSchema),
    updateCapitulo
);

// Eliminar
router.delete("/:id", deleteCapitulo);

// Extras
router.get("/:id/adyacentes", getCapitulosAdyacentes);
router.get("/:id/comentarios", getComentariosByCapitulo);

export default router;