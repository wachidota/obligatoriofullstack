import express from "express";
import {
    createLibro,
    getAllLibros,
    getLibroById,
    updateLibro,
    deleteLibro,
    getPromedioCalificaciones,
    getLibrosByCategoria,
    getCapitulosByLibro,
    getReviewsByLibro
} from "../controllers/libroController.js";

import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import {
    createLibroSchema,
    updateLibroSchema
} from "../validators/libro.validator.js";

const router = express.Router();

// Crear libro (validación)
router.post(
    "/",
    validateBodyMiddleware(createLibroSchema),
    createLibro
);

// Obtener todos
router.get("/", getAllLibros);

// IMPORTANTE: rutas específicas primero
router.get("/categoria/:categoria", getLibrosByCategoria);

// Obtener por ID
router.get("/:id", getLibroById);

// Actualizar
router.put(
    "/:id",
    validateBodyMiddleware(updateLibroSchema),
    updateLibro
);

// Eliminar
router.delete("/:id", deleteLibro);

// Extras
router.get("/:id/promedio-calificaciones", getPromedioCalificaciones);
router.get("/:id/capitulos", getCapitulosByLibro);
router.get("/:id/reviews", getReviewsByLibro);

export default router;