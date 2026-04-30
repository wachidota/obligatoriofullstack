import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import Usuario from "../models/UsuarioModel.js";

export const registrarUsuarioService = async (user) => {
    const { email, password, nombre } = user;

    // 🔎 Verificar si ya existe
    const existente = await Usuario.findOne({ email });

    if (existente) {
        const err = new Error("El email ya está registrado");
        err.status = 409;
        throw err;
    }

    // 🔐 Hash
    const hashedPassword = bcryptjs.hashSync(
        password,
        Number(process.env.SALT_ROUNDS)
    );

    const nuevoUsuario = new Usuario({
        email,
        password: hashedPassword,
        nombre
    });

    await nuevoUsuario.save();

    return nuevoUsuario;
};

export const loginUsuarioService = async (user) => {
  // Buscar usuario por email y que esté activo
  const usuarioEncontrado = await Usuario.findOne({ email: user.email, activo: true });
  if (!usuarioEncontrado) {
    return { success: false, message: "Usuario no encontrado o inactivo" };
  }

  // Validar contraseña
  console.log("Password recibido:", user.password);
console.log("Hash en DB:", usuarioEncontrado.password);
const valid = bcryptjs.compareSync(user.password, usuarioEncontrado.password);
console.log("Resultado compare:", valid);
  if (!valid) {
    return { success: false, message: "Contraseña incorrecta" };
  }

  // Actualizar último login
  usuarioEncontrado.ultimoLogin = new Date();
  await usuarioEncontrado.save();

  
  // Retornar usuario sin contraseña
  const usuarioSinPW = await Usuario.findById(usuarioEncontrado._id).select("-password");

  return { success: true, message: "Login exitoso", user: usuarioSinPW };
};
