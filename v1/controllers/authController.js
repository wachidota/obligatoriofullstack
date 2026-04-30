import jwt from "jsonwebtoken";
import {
    registrarUsuarioService,
    loginUsuarioService
} from "../services/authService.js";

// Registro
export const registrarUsuario = async (req, res, next) => {
    try {
        const { email, password, nombre } = req.validatedBody || req.body;

        const usuario = await registrarUsuarioService({
            email,
            password,
            nombre
        });

        const token = jwt.sign(
            { id: usuario._id, email: usuario.email },
            process.env.SECRET_JWT,
            { expiresIn: "1d" }
        );

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario,
            token
        });

    } catch (err) {
        next(err);
    }
};

// Login
export const loginUsuario = async (req, res, next) => {
    try {
        const { email, password } = req.validatedBody || req.body;
        const result = await loginUsuarioService({ email, password });

        if (!result.success) {
            return next({
                status: 401,
                message: result.message
            });
        }

        const usuario = result.user;

        const token = jwt.sign(
            { id: usuario._id, email: usuario.email },
            process.env.SECRET_JWT,
            { expiresIn: "1d" }
        );

        res.json({
            mensaje: "Login exitoso",
            usuario,
            token
        });

    } catch (err) {
        next(err);
    }
};
