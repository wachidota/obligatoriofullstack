import Joi from "joi";

export const createLibroSchema = Joi.object({
    titulo: Joi.string().trim().required().messages({
        "string.base": "El título del libro debe ser texto",
        "string.empty": "El título del libro no puede estar vacío",
        "any.required": "El título del libro es obligatorio"
    }),
    autorId: Joi.string().length(24).hex().messages({
        "string.base": "El ID del autor debe ser texto",
        "string.length": "El ID del autor debe tener 24 caracteres",
    }),
    categoriaLista: Joi.array().items(
        Joi.string().length(24).hex().messages({
            "string.base": "Cada ID de categoría debe ser texto",
            "string.length": "Cada ID de categoría debe tener 24 caracteres",
            "string.hex": "Cada ID de categoría debe ser un ObjectId válido"
        })
    ).min(1).required().messages({
        "array.base": "La lista de categorías debe ser un array",
        "array.min": "Debes seleccionar al menos una categoría",
        "any.required": "La lista de categorías es obligatoria"
    }),
    descripcion: Joi.string().trim().required().messages({
        "string.base": "La descripción debe ser texto",
        "string.empty": "La descripción no puede estar vacía",
        "any.required": "La descripción es obligatoria"
    }),
    portada: Joi.string().trim().uri().required().messages({
        "string.base": "La portada debe ser texto",
        "string.empty": "La portada no puede estar vacía",
        "string.uri": "La portada debe ser una URL válida",
        "any.required": "La portada es obligatoria"
    })
});

export const updateLibroSchema = Joi.object({
    titulo: Joi.string().trim().optional().messages({
        "string.base": "El título del libro debe ser texto",
        "string.empty": "El título del libro no puede estar vacío"
    }),
    autorId: Joi.string().length(24).hex().optional().messages({
        "string.base": "El ID del autor debe ser texto",
        "string.length": "El ID del autor debe tener 24 caracteres",
        "string.hex": "El ID del autor debe ser un ObjectId válido"
    }),
    categoriaLista: Joi.array().items(
        Joi.string().length(24).hex().messages({
            "string.base": "Cada ID de categoría debe ser texto",
            "string.length": "Cada ID de categoría debe tener 24 caracteres",
            "string.hex": "Cada ID de categoría debe ser un ObjectId válido"
        })
    ).min(1).optional().messages({
        "array.base": "La lista de categorías debe ser un array",
        "array.min": "Debes seleccionar al menos una categoría"
    }),
    descripcion: Joi.string().empty(/\s+/).optional().messages({
        "string.base": "La descripción debe ser texto",
        "string.empty": "La descripción no puede estar vacía"
    }),
    portada: Joi.string().trim().uri().optional().messages({
        "string.base": "La portada debe ser texto",
        "string.empty": "La portada no puede estar vacía",
        "string.uri": "La portada debe ser una URL válida"
    }),
    activo: Joi.boolean().optional().messages({
        "boolean.base": "El campo activo debe ser booleano"
    })
}).min(1).messages({
    "object.min": "Debes enviar al menos un campo para actualizar"
});
