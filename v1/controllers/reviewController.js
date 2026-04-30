import {
    createReviewService,
    getReviewByIdService,
    deleteReviewService
} from "../services/reviewService.js";


// Crear review
export const createReview = async (req, res, next) => {
    try {
        const { libroId, calificacion, comentario } =
            req.validatedBody || req.body;

        const usuarioId = req.user.id; 

        const review = await createReviewService(
            libroId,
            usuarioId,
            calificacion,
            comentario
        );

        res.status(201).json({
            mensaje: "Review creada",
            review
        });

    } catch (err) {
        next(err);
    }
};

// Obtener review por ID
export const getReviewById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const review = await getReviewByIdService(id);

        if (!review) {
            return next({
                status: 404,
                message: "Review no encontrada"
            });
        }

        res.json({
            mensaje: "Review encontrada",
            review
        });
    } catch (err) {
        next(err);
    }
};

// Eliminar review
export const deleteReview = async (req, res, next) => {
    try {
        const { id } = req.params;

        const review = await deleteReviewService(id);

        if (!review) {
            return next({
                status: 404,
                message: "Review no encontrada"
            });
        }

        res.json({
            mensaje: "Review eliminada",
            review
        });
    } catch (err) {
        next(err);
    }
};