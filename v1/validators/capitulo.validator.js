import Joi from "joi";

export const createCapituloSchema = Joi.object({
    titulo: Joi.string().trim().required().messages({
        "string.base": "El título debe ser texto",
        "string.empty": "El título no puede estar vacío",
        "any.required": "El título es obligatorio"
    }),

    contenido: Joi.string().trim().required().messages({
        "string.base": "El contenido debe ser texto",
        "string.empty": "El contenido no puede estar vacío",
        "any.required": "El contenido es obligatorio"
    }),

    numero: Joi.number().integer().min(1).required().messages({
        "number.base": "El número debe ser un valor numérico",
        "number.integer": "El número debe ser un entero",
        "number.min": "El número debe ser mayor o igual a 1",
        "any.required": "El número de capítulo es obligatorio"
    }),

    libroId: Joi.string().length(24).hex().required().messages({
        "string.base": "El ID del libro debe ser texto",
        "string.length": "El ID del libro debe tener 24 caracteres",
        "string.hex": "El ID del libro debe ser un ObjectId válido",
        "any.required": "El ID del libro es obligatorio"
    })
});

export const updateCapituloSchema = Joi.object({
    titulo: Joi.string().trim().optional().messages({
        "string.base": "El título debe ser texto",
        "string.empty": "El título no puede estar vacío"
    }),

    contenido: Joi.string().trim().optional().messages({
        "string.base": "El contenido debe ser texto",
        "string.empty": "El contenido no puede estar vacío"
    }),

    numero: Joi.number().integer().min(1).optional().messages({
        "number.base": "El número debe ser un valor numérico",
        "number.integer": "El número debe ser un entero",
        "number.min": "El número debe ser mayor o igual a 1"
    }),

    libroId: Joi.string().length(24).hex().optional().messages({
        "string.base": "El ID del libro debe ser texto",
        "string.length": "El ID del libro debe tener 24 caracteres",
        "string.hex": "El ID del libro debe ser un ObjectId válido"
    })
}).min(1).messages({
    "object.min": "Debes enviar al menos un campo para actualizar"
});