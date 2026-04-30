import Joi from "joi";

export const createCategoriaSchema = Joi.object({
    nombre: Joi.string().trim().required().messages({
        "string.base": "El nombre de la categoría debe ser texto",
        "string.empty": "El nombre de la categoría no puede estar vacío",
        "any.required": "El nombre de la categoría es obligatorio"
    }),
});

