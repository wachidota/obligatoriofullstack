import Joi from "joi";


export const createComentarioSchema = Joi.object({
    contenido: Joi.string().trim().required().messages({
        "string.empty": "El contenido no puede estar vacío",
        "any.required": "El contenido es obligatorio"
    }),
    capituloId: Joi.string().length(24).hex().required().messages({
        "string.length": "El ID debe tener 24 caracteres",
        "string.hex": "Debe ser un ObjectId válido",
        "any.required": "El capítulo es obligatorio"
    })
});

export const updateComentarioSchema = Joi.object({
    contenido: Joi.string().trim().optional().messages({
        "string.base": "El contenido del comentario debe ser texto",
        "string.empty": "El contenido del comentario no puede estar vacío"
    }),
    autorId: Joi.string().length(24).hex().optional().messages({
        "string.base": "El ID del autor debe ser texto",
        "string.length": "El ID del autor debe tener 24 caracteres",
        "string.hex": "El ID del autor debe ser un ObjectId válido"
    }),
    capituloId: Joi.string().length(24).hex().optional().messages({
        "string.base": "El ID del capítulo debe ser texto",
        "string.length": "El ID del capítulo debe tener 24 caracteres",
        "string.hex": "El ID del capítulo debe ser un ObjectId válido"
    })
}).min(1).messages({
    "object.min": "Debes enviar al menos un campo para actualizar"
});
