import Review from "../models/reviewModel.js";
import Libro from "../models/LibroModel.js";
import Usuario from "../models/UsuarioModel.js";
import { isValidObjectId } from "mongoose";

export const createReviewService = async (libroId, usuarioId, calificacion, comentario) => {
  // Validar campos requeridos
    if (!isValidObjectId(libroId) || !isValidObjectId(usuarioId)) {
        const error = new Error("IDs no válidos");
        error.status = 400;
        throw error;
    }
    if (calificacion < 1 || calificacion > 5) {
        const error = new Error("Calificación debe estar entre 1 y 5");
        error.status = 400;
        throw error;
    }

    const libro = await Libro.findOne({ _id: libroId, activo: true });
    if (!libro) {
        const error = new Error("Libro no encontrado o inactivo");
        error.status = 404;
        throw error;
    }

    const usuario = await Usuario.findOne({ _id: usuarioId, activo: true });
    if (!usuario) {
        const error = new Error("Usuario no encontrado o inactivo");
        error.status = 404;
        throw error;
    }

    // Verificar que no haya ya una review de este usuario para este libro
    const existingReview = await Review.findOne({ libro: libroId, usuario: usuarioId });
    if (existingReview) {
        const error = new Error("Ya existe una review de este usuario para este libro");
        error.status = 409;
        throw error;
    }

    const review = new Review({
        libro: libroId,
        usuario: usuarioId,
        calificacion,
        comentario
    });
    await review.save();

    // Agregar a lista de reviews del libro
    libro.reviews.push(review._id);
    await libro.save();

    return review;
};

export const getReviewByIdService = async (id) => {
    if (!isValidObjectId(id)) {
        const error = new Error("ID de review no válido");
        error.status = 400;
        throw error;
    }
    const review = await Review.findById(id).populate('libro', 'titulo').populate('usuario', 'nombre');
    if (!review) {
        const error = new Error("Review no encontrada");
        error.status = 404;
        throw error;
    }
    return review;
};

export const deleteReviewService = async (id) => {
    if (!isValidObjectId(id)) {
        const error = new Error("ID de review no válido");
        error.status = 400;
        throw error;
    }
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
        const error = new Error("Review no encontrada");
        error.status = 404;
        throw error;
    }

    // Remover de lista de reviews del libro
    await Libro.findByIdAndUpdate(review.libro, { $pull: { reviews: id } });

    return review;
};