import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import Usuario from "../models/UsuarioModel.js";

export const registrarUsuarioService = async (user) => {
    const password = user.password;
    const hashedPassword = bcryptjs.hashSync(password, Number(process.env.SALT_ROUNDS));
    user.password = hashedPassword;
    const nuevoUsuario = new Usuario(user);
    await nuevoUsuario.save();
    return { success: true, message: "Usuario registrado exitosamente", usuario:nuevoUsuario };

};

export const loginUsuarioService = async (user) => {
  // Buscar usuario por email y que esté activo
  const usuarioEncontrado = await Usuario.findOne({ email: user.email, activo: true });
  if (!usuarioEncontrado) {
    return { success: false, message: "Usuario no encontrado o inactivo" };
  }

  // Validar contraseña
  const valid = bcryptjs.compareSync(user.password, usuarioEncontrado.password);
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
