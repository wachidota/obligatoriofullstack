import { error } from "node:console";
import Usuario from "../models/UsuarioModel.js";
import Libro from "../models/LibroModel.js";
import { isValidObjectId } from "mongoose";
import bcryptjs from "bcryptjs";
import 'dotenv/config';


export const getUsuarioByIdService = async (id) => {
    if (!isValidObjectId(id)) {
        const error = new Error("ID de usuario no válido");
        error.details = "ID debe ser un ObjectId válido";
        error.status = 400;
        throw error;
     }
     const usuario = await Usuario.findOne({ _id: id, activo: true });
        if (!usuario) {
            const error = new Error("Usuario no encontrado o inactivo");
            error.details = "No existe un usuario activo con el ID proporcionado";
            error.status = 404;
            throw error;
         }
     return usuario;
};


export const setUsuarioPremiumService = async (id) => {
    if (!isValidObjectId(id)) {
        const error = new Error("ID de usuario no válido");
        error.details = "ID debe ser un ObjectId válido";
        error.status = 400;
        throw error;
    }
    const usuario = await Usuario.findOneAndUpdate(
        { _id: id, activo: true },
        { premium: true },
        { new: true }
    );
    if (!usuario) {
        const error = new Error("Usuario no encontrado o inactivo");
        error.details = "No existe un usuario activo con el ID proporcionado";
        error.status = 404;
        throw error;
    }
    return usuario;
};


export const deactivateUsuarioService = async (id) => {
    if (!isValidObjectId(id)) {
        const error = new Error("ID de usuario no válido");
        error.details = "ID debe ser un ObjectId válido";
        error.status = 400;
        throw error;
    }
    const usuario = await Usuario.findOneAndUpdate(
        { _id: id, activo: true },
        { activo: false },
        { new: true }
    );
    if (!usuario) {
        const error = new Error("Usuario no encontrado o inactivo");
        error.details = "No existe un usuario activo con el ID proporcionado";
        error.status = 404;
        throw error;
    }
    return usuario;
};


export const updateUsuarioPasswordService = async (id, newPassword) => {
    if (!isValidObjectId(id)) {
        const error = new Error("ID de usuario no válido");
        error.details = "ID debe ser un ObjectId válido";
        error.status = 400;
        throw error;
    }
    if (!newPassword || newPassword.length < 6) {
        const error = new Error("Contraseña inválida");
        error.details = "La contraseña debe tener al menos 6 caracteres";
        error.status = 400;
        throw error;
    }
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    const usuario = await Usuario.findOneAndUpdate(
        { _id: id, activo: true },
        { password: hashedPassword },
        { new: true }
    );
    if (!usuario) {
        const error = new Error("Usuario no encontrado o inactivo");
        error.details = "No existe un usuario activo con el ID proporcionado";
        error.status = 404;
        throw error;
    }
    return usuario;
};


export const addLibroLeidoService = async (idUsuario, idLibro) => {
    if (!isValidObjectId(idUsuario)) {
        const error = new Error("ID de usuario no válido");
        error.details = "ID debe ser un ObjectId válido";
        error.status = 400;
        throw error;
    }
    if (!isValidObjectId(idLibro)) {
        const error = new Error("ID de libro no válido");
        error.details = "ID debe ser un ObjectId válido";
        error.status = 400;
        throw error;
    }

    const usuario = await Usuario.findOne({ _id: idUsuario, activo: true });
    if (!usuario) {
        const error = new Error("Usuario no encontrado o inactivo");
        error.details = "No existe un usuario activo con el ID proporcionado";
        error.status = 404;
        throw error;
    }

    const libro = await Libro.findById(idLibro);
    if (!libro) {
        const error = new Error("Libro no encontrado");
        error.details = "No existe un libro con el ID proporcionado";
        error.status = 404;
        throw error;
    }

    const LIMITE_LIBRO = parseInt(process.env.LIMITE_LIBRO);

    if (!usuario.premium && usuario.listaLibrosLeidos.length >= LIMITE_LIBRO) {
        const error = new Error("Límite de libros leídos alcanzado");
        error.details = `Los usuarios regulares pueden tener máximo ${LIMITE_LIBRO} libros leídos`;
        error.status = 403;
        throw error;
    }

    if (usuario.listaLibrosLeidos.includes(idLibro)) {
        const error = new Error("Libro ya está en la lista de leídos");
        error.details = "El libro ya ha sido agregado a la lista";
        error.status = 409;
        throw error;
    }

    usuario.listaLibrosLeidos.push(idLibro);
    await usuario.save();

    return usuario;
};


export const removeLibroLeidoService = async (idUsuario, idLibro) => {
    if (!isValidObjectId(idUsuario)) {
        const error = new Error("ID de usuario no válido");
        error.details = "ID debe ser un ObjectId válido";
        error.status = 400;
        throw error;
    }
    if (!isValidObjectId(idLibro)) {
        const error = new Error("ID de libro no válido");
        error.details = "ID debe ser un ObjectId válido";
        error.status = 400;
        throw error;
    }

    const usuario = await Usuario.findOne({ _id: idUsuario, activo: true });
    if (!usuario) {
        const error = new Error("Usuario no encontrado o inactivo");
        error.details = "No existe un usuario activo con el ID proporcionado";
        error.status = 404;
        throw error;
    }

    const libro = await Libro.findById(idLibro);
    if (!libro) {
        const error = new Error("Libro no encontrado");
        error.details = "No existe un libro con el ID proporcionado";
        error.status = 404;
        throw error;
    }

    if (!usuario.listaLibrosLeidos.includes(idLibro)) {
        const error = new Error("Libro no está en la lista de leídos");
        error.details = "El libro no se encuentra en la lista";
        error.status = 409;
        throw error;
    }

    usuario.listaLibrosLeidos.pull(idLibro);
    await usuario.save();

    return usuario;
};

export const getLibrosLeidosService = async (idUsuario) => {
    if (!isValidObjectId(idUsuario)) {
        const error = new Error("ID de usuario no válido");
        error.details = "ID debe ser un ObjectId válido";
        error.status = 400;
        throw error;
    }

    const usuario = await Usuario.findOne({ _id: idUsuario, activo: true })
    .populate('listaLibrosLeidos', 'titulo autor -_id');
    if (!usuario) {
        const error = new Error("Usuario no encontrado o inactivo");
        error.details = "No existe un usuario activo con el ID proporcionado";
        error.status = 404;
        throw error;
    }

    return usuario.listaLibrosLeidos ;
};

export const getLibrosEcritosService = async (idUsuario) => {
    if (!isValidObjectId(idUsuario)) {
        const error = new Error("ID de usuario no válido");
        error.details = "ID debe ser un ObjectId válido";
        error.status = 400;
        throw error;
    }

    const usuario = await Usuario.findOne({ _id: idUsuario, activo: true }).populate('listaLibrosEscritos', 'titulo CategoriaLista -_id');
    if (!usuario) {
        const error = new Error("Usuario no encontrado o inactivo");
        error.details = "No existe un usuario activo con el ID proporcionado";
        error.status = 404;
        throw error;
    }

    return usuario.listaLibrosEcritos ;
};

