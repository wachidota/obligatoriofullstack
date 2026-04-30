import Comentario from "../models/comentarioModel.js";
import Usuario from "../models/UsuarioModel.js";
import Capitulo from "../models/capituloModel.js";
import { isValidObjectId } from "mongoose";

export const createComentarioService = async (contenido, autorId, capituloId) => {
    //validator
    if (!isValidObjectId(autorId) || !isValidObjectId(capituloId)) {
        const error = new Error("IDs no válidos");
        error.status = 400;
        throw error;
    }

    const autor = await Usuario.findOne({ _id: autorId, activo: true });
    if (!autor) {
        const error = new Error("Autor no encontrado o inactivo");
        error.status = 404;
        throw error;
    }

    const capitulo = await Capitulo.findById(capituloId);
    if (!capitulo) {
        const error = new Error("Capítulo no encontrado");
        error.status = 404;
        throw error;
    }

    const comentario = new Comentario({
        contenido,
        autor: autorId,
        capitulo: capituloId
    });
    await comentario.save();

    return comentario;
};

export const getComentarioByIdService = async (id) => {
    if (!isValidObjectId(id)) {
        const error = new Error("ID de comentario no válido");
        error.status = 400;
        throw error;
    }
    const comentario = await Comentario.findById(id).populate('autor', 'nombre');
    if (!comentario) {
        const error = new Error("Comentario no encontrado");
        error.status = 404;
        throw error;
    }
    return comentario;
};

export const deleteComentarioService = async (id) => {
    if (!isValidObjectId(id)) {
        const error = new Error("ID de comentario no válido");
        error.status = 400;
        throw error;
    }
    const comentario = await Comentario.findByIdAndDelete(id);
    if (!comentario) {
        const error = new Error("Comentario no encontrado");
        error.status = 404;
        throw error;
    }
    return comentario;
};