import Capitulo from "../models/capituloModel.js";
import Libro from "../models/LibroModel.js";
import Usuario from "../models/UsuarioModel.js";
import Comentario from "../models/comentarioModel.js";
import { isValidObjectId } from "mongoose";
import 'dotenv/config';

export const createCapituloService = async (titulo, contenido, numero, libroId) => {
    // validator
    if (!isValidObjectId(libroId)) {
        const error = new Error("ID de libro no válido");
        error.status = 400;
        throw error;
    }

    const libro = await Libro.findOne({ _id: libroId, activo: true });
    if (!libro) {
        const error = new Error("Libro no encontrado o inactivo");
        error.status = 404;
        throw error;
    }

    const autor = await Usuario.findOne({ _id: libro.autor, activo: true });
    if (!autor) {
        const error = new Error("Autor no encontrado o inactivo");
        error.status = 404;
        throw error;
    }

    const LIMITE_LIBRO = parseInt(process.env.LIMITE_LIBRO) || 4;
    if (!autor.premium && libro.listaCapitulos.length >= LIMITE_LIBRO) {
        const error = new Error("Límite de capítulos alcanzado");
        error.details = `Los usuarios regulares pueden tener máximo ${LIMITE_LIBRO} capítulos por libro`;
        error.status = 403;
        throw error;
    }

    // Verificar que el numero no esté duplicado
    const existingCapitulo = await Capitulo.findOne({ libro: libroId, numero });
    if (existingCapitulo) {
        const error = new Error("Ya existe un capítulo con ese número en este libro");
        error.status = 400;
        throw error;
    }

    const capitulo = new Capitulo({
        titulo,
        contenido,
        numero,
        libro: libroId
    });
    await capitulo.save();

    // Agregar a listaCapitulos del libro
    libro.listaCapitulos.push(capitulo._id);
    await libro.save();

    return capitulo;
};

export const getCapituloByIdService = async (id) => {
    if (!isValidObjectId(id)) {
        const error = new Error("ID de capítulo no válido");
        error.status = 400;
        throw error;
    }
    const capitulo = await Capitulo.findById(id).populate('libro', 'titulo');
    if (!capitulo) {
        const error = new Error("Capítulo no encontrado");
        error.status = 404;
        throw error;
    }
    return capitulo;
};

export const updateCapituloService = async (id, updates) => {
    if (!isValidObjectId(id)) {
        const error = new Error("ID de capítulo no válido");
        error.status = 400;
        throw error;
    }
    const capitulo = await Capitulo.findByIdAndUpdate(id, updates, { new: true }).populate('libro', 'titulo');
    if (!capitulo) {
        const error = new Error("Capítulo no encontrado");
        error.status = 404;
        throw error;
    }
    return capitulo;
};

export const deleteCapituloService = async (id) => {
    if (!isValidObjectId(id)) {
        const error = new Error("ID de capítulo no válido");
        error.status = 400;
        throw error;
    }
    const capitulo = await Capitulo.findByIdAndDelete(id);
    if (!capitulo) {
        const error = new Error("Capítulo no encontrado");
        error.status = 404;
        throw error;
    }

    // Remover de listaCapitulos del libro
    await Libro.findByIdAndUpdate(capitulo.libro, { $pull: { listaCapitulos: id } });

    return capitulo;
};

export const getCapitulosAdyacentesService = async (id) => {
    if (!isValidObjectId(id)) {
        const error = new Error("ID de capítulo no válido");
        error.status = 400;
        throw error;
    }
    const capitulo = await Capitulo.findById(id);
    if (!capitulo) {
        const error = new Error("Capítulo no encontrado");
        error.status = 404;
        throw error;
    }

    const capitulos = await Capitulo.find({ libro: capitulo.libro }).sort({ numero: 1 });
    const index = capitulos.findIndex(c => c._id.toString() === id);

    const anterior = index > 0 ? capitulos[index - 1]._id : null;
    const siguiente = index < capitulos.length - 1 ? capitulos[index + 1]._id : null;

    return { anterior, siguiente };
};
export const getComentariosByCapituloService = async (capituloId) => {
    if (!isValidObjectId(capituloId)) {
        const error = new Error("ID de capítulo no válido");
        error.status = 400;
        throw error;
    }
    const capitulo = await Capitulo.findById(capituloId);
    if (!capitulo) {
        const error = new Error("Capítulo no encontrado");
        error.status = 404;
        throw error;
    }
    const comentarios = await Comentario.find({ capitulo: capituloId }).populate('autor', 'nombre -_id');
    return comentarios;
};