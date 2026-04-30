import express from "express";
import {
    createReview,
    getReviewById,
    deleteReview
} from "../controllers/reviewController.js";

import {validateBodyMiddleware} from "../middlewares/validateBody.middleware.js";
import { createReviewSchema } from "../validators/review.validator.js";

const router = express.Router({ mergeParams: true });

// Crear review con validación
router.post(
    "/",
    validateBodyMiddleware(createReviewSchema),
    createReview
);

// Obtener review
router.get("/:id", getReviewById);

// Eliminar review
router.delete("/:id", deleteReview);

export default router;