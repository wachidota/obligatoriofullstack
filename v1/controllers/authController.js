import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
    registrarUsuarioService,
    loginUsuarioService
} from "../services/authService.js";

// Registro
export const registrarUsuario = async (req, res, next) => {
    try {
        const { email, password, nombre } = req.validatedBody || req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const usuario = await registrarUsuarioService({
            email,
            password: hashedPassword,
            nombre
        });

        // Generar token
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

        // Buscar usuario
        const usuario = await loginUsuarioService(email);

        if (!usuario) {
            return next({
                status: 401,
                message: "Credenciales inválidas"
            });
        }

        // Comparar password
        const isMatch = await bcrypt.compare(password, usuario.password);

        if (!isMatch) {
            return next({
                status: 401,
                message: "Credenciales inválidas"
            });
        }

        // Generar token
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