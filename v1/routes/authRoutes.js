import express from "express";
import {
    registrarUsuario,
    loginUsuario
} from "../controllers/authController.js";

import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { registroUsuarioSchema, loginUsuarioSchema } from "../validators/usuario.validator.js";

const router = express.Router({ mergeParams: true });

// Registro con validación
router.post(
    "/registro",
    validateBodyMiddleware(registroUsuarioSchema),
    registrarUsuario
);

// Login con validación
router.post(
    "/login",
    validateBodyMiddleware(loginUsuarioSchema),
    loginUsuario
);

export default router;