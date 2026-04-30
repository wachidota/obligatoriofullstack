import Joi from "joi";

export const createReviewSchema = Joi.object({
    libroId: Joi.string().length(24).hex().required().messages({
        "string.base": "El ID del libro debe ser texto",
        "string.length": "El ID del libro debe tener 24 caracteres",
        "string.hex": "El ID del libro debe ser un ObjectId válido",
        "any.required": "El ID del libro es obligatorio"
    }),
    calificacion: Joi.number().integer().min(1).max(5).required().messages({
        "number.base": "La calificación debe ser un número",
        "number.integer": "La calificación debe ser un número entero",
        "number.min": "La calificación mínima es 1",
        "number.max": "La calificación máxima es 5",
        "any.required": "La calificación es obligatoria"
    }),
    comentario: Joi.string().empty(/\s+/).required().messages({
        "string.base": "El comentario debe ser texto",
        "string.empty": "El comentario no puede estar vacío",
        "any.required": "El comentario es obligatorio"
    })
});

export const updateReviewSchema = Joi.object({
    libroId: Joi.string().length(24).hex().optional().messages({
        "string.base": "El ID del libro debe ser texto",
        "string.length": "El ID del libro debe tener 24 caracteres",
        "string.hex": "El ID del libro debe ser un ObjectId válido"
    }),
    usuarioId: Joi.string().length(24).hex().optional().messages({
        "string.base": "El ID del usuario debe ser texto",
        "string.length": "El ID del usuario debe tener 24 caracteres",
        "string.hex": "El ID del usuario debe ser un ObjectId válido"
    }),
    calificacion: Joi.number().integer().min(1).max(5).optional().messages({
        "number.base": "La calificación debe ser un número",
        "number.integer": "La calificación debe ser un número entero",
        "number.min": "La calificación mínima es 1",
        "number.max": "La calificación máxima es 5"
    }),
    comentario: Joi.string().empty(/\s+/).optional().messages({
        "string.base": "El comentario debe ser texto",
        "string.empty": "El comentario no puede estar vacío"
    })
}).min(1).messages({
    "object.min": "Debes enviar al menos un campo para actualizar"
});

