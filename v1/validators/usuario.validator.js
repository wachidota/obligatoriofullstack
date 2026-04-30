import Joi from "joi";

// Esquema para registro de usuario con estándares de seguridad
export const registroUsuarioSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .lowercase()
        .messages({
            "string.base": "El email debe ser texto",
            "string.email": "El email debe ser una dirección de correo válida",
            "any.required": "El email es obligatorio"
        }),
    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .required()
        .messages({
            "string.base": "La contraseña debe ser texto",
            "string.min": "La contraseña debe tener al menos 8 caracteres",
            "string.pattern.base": "La contraseña debe contener al menos una mayúscula, una minúscula y un número",
            "any.required": "La contraseña es obligatoria"
        }),
    nombre: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.base": "El nombre debe ser texto",
            "string.min": "El nombre debe tener al menos 2 caracteres",
            "string.max": "El nombre no puede exceder 100 caracteres",
            "any.required": "El nombre es obligatorio"
        }),
    premium: Joi.boolean()
        .optional()
        .default(false)
        .messages({
            "boolean.base": "El campo premium debe ser booleano"
        })
});

// Esquema para login
export const loginUsuarioSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .lowercase()
        .messages({
            "string.base": "El email debe ser texto",
            "string.email": "El email debe ser una dirección de correo válida",
            "any.required": "El email es obligatorio"
        }),
    password: Joi.string()
        .required()
        .messages({
            "string.base": "La contraseña debe ser texto",
            "any.required": "La contraseña es obligatoria"
        })
});

// Esquema para actualizar contraseña
export const actualizarPasswordSchema = Joi.object({
    newPassword: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .required()
        .messages({
            "string.base": "La nueva contraseña debe ser texto",
            "string.min": "La nueva contraseña debe tener al menos 8 caracteres",
            "string.pattern.base": "La nueva contraseña debe contener al menos una mayúscula, una minúscula y un número",
            "any.required": "La nueva contraseña es obligatoria"
        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('newPassword'))
        .required()
        .messages({
            "any.only": "Las contraseñas no coinciden",
            "any.required": "Debes confirmar la contraseña"
        })
});


// Esquema para agregar libro leído
export const agregarLibroLeidoSchema = Joi.object({
    idLibro: Joi.string()
        .length(24)
        .hex()
        .required()
        .messages({
            "string.base": "El ID del libro debe ser texto",
            "string.length": "El ID del libro debe tener 24 caracteres",
            "string.hex": "El ID del libro debe ser un ObjectId válido",
            "any.required": "El ID del libro es obligatorio"
        })
});
