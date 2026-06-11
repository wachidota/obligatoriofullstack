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
  const invalidCredentialsMessage = "usuario o contrase�a incorrectos";

  const usuarioEncontrado = await Usuario.findOne({ email: user.email, activo: true });
  if (!usuarioEncontrado) {
    return { success: false, message: invalidCredentialsMessage };
  }

  const valid = bcryptjs.compareSync(user.password, usuarioEncontrado.password);
  if (!valid) {
    return { success: false, message: invalidCredentialsMessage };
  }

  usuarioEncontrado.ultimoLogin = new Date();
  await usuarioEncontrado.save();

  const usuarioSinPW = await Usuario.findById(usuarioEncontrado._id).select("-password");

  return { success: true, message: "Login exitoso", user: usuarioSinPW };
};
