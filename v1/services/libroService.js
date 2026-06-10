import Libro from "../models/LibroModel.js";
import Usuario from "../models/UsuarioModel.js";
import Categoria from "../models/CategoriaModel.js";
import Review from "../models/reviewModel.js";
import mongoose from "mongoose";
import { isValidObjectId } from "mongoose";
import 'dotenv/config';

export const createLibroService =
async (
    titulo,
    autorId,
    categoriaLista,
    descripcion,
    portada
) => {

    const autor = await Usuario.findOne({
        _id: autorId,
        activo: true
    });

    if (!autor) {

        const error =
            new Error("Autor no encontrado");

        error.status = 404;

        throw error;
    }

    const LIMITE_LIBRO =
        parseInt(process.env.LIMITE_LIBRO);

    if (
        !autor.premium &&
        autor.listaLibrosEscritos.length >= LIMITE_LIBRO
    ) {

        const error =
            new Error(
                "Límite de libros escritos alcanzado"
            );

        error.status = 403;

        throw error;
    }

    const categorias =
        await Categoria.find({
            _id: { $in: categoriaLista },
            activo: true
        });

    if (
        categorias.length !== categoriaLista.length
    ) {

        const error =
            new Error(
                "Una o más categorías no existen"
            );

        error.status = 400;

        throw error;
    }

    const libro = new Libro({
        titulo,
        autor: autorId,
        categoriaLista: categoriaLista,
        descripcion,
        portada
    });

    await libro.save();

    autor.listaLibrosEscritos.push(libro._id);

    await autor.save();

    return libro;
};

export const getAllLibrosService = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const libros = await Libro.find({ activo: true })
        .populate('autor', 'nombre -_id')
        .populate('categoriaLista', 'nombre -_id')
        .skip(skip)
        .limit(limit);

    const total = await Libro.countDocuments({ activo: true });

    return {
        libros,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};


export const getLibroByIdService = async (id) => {
    if (!isValidObjectId(id)) {
        const error = new Error("ID de libro no válido");
        error.status = 400;
        throw error;
    }
    const libro = await Libro.findById(id)
    .populate("autor", "_id nombre")
    .populate("categoriaLista", "_id nombre")
    .populate("listaCapitulos");
    if (!libro) {
        const error = new Error("Libro no encontrado o inactivo");
        error.status = 404;
        throw error;
    }
    return libro;
};

export const updateLibroService = async (id, updates, usuarioId) => {
    if (!isValidObjectId(id)) {
        const error = new Error("ID de libro no válido");
        error.status = 400;
        throw error;
    }

    const libroActual = await Libro.findOne({ _id: id, activo: true });
    if (!libroActual) {
        const error = new Error("Libro no encontrado o inactivo");
        error.status = 404;
        throw error;
    }

    if (libroActual.autor.toString() !== usuarioId) {
        const error = new Error("No tienes permiso para realizar esta acción");
        error.status = 403;
        throw error;
    }

    const libro = await Libro.findOneAndUpdate(
        { _id: id, activo: true },
        updates,
        { new: true }
    ).populate('autor', 'nombre -_id').populate('categoriaLista', 'nombre -_id');

    return libro;
};

export const deleteLibroService = async (id, usuarioId) => {
    if (!isValidObjectId(id)) {
        const error = new Error("ID de libro no válido");
        error.status = 400;
        throw error;
    }

    const libroActual = await Libro.findOne({ _id: id, activo: true });
    if (!libroActual) {
        const error = new Error("Libro no encontrado o inactivo");
        error.status = 404;
        throw error;
    }

    if (libroActual.autor.toString() !== usuarioId) {
        const error = new Error("No tienes permiso para realizar esta acción");
        error.status = 403;
        throw error;
    }

    const libro = await Libro.findOneAndUpdate(
        { _id: id, activo: true },
        { activo: false },
        { new: true }
    );

    await Usuario.findByIdAndUpdate(libro.autor, { $pull: { listaLibrosEscritos: id } });
    return libro;
};
export const getLibrosByCategoriaService = async (categoriaId) => {
    if (!isValidObjectId(categoriaId)) {
        const error = new Error("ID de categoría no válido");
        error.status = 400;
        throw error;
    }
    const categoria = await Categoria.findOne({ _id: categoriaId, activo: true });
    if (!categoria) {
        const error = new Error("Categoría no encontrada o inactiva");
        error.status = 404;
        throw error;
    }
    const libros = await Libro.find({ CategoriaLista: categoriaId, activo: true }).populate('autor', 'nombre -_id').populate('CategoriaLista', 'nombre -_id');
    return libros;
}

export const getPromedioCalificacionesService = async (idLibro) => {
    if (!isValidObjectId(idLibro)) {
        const error = new Error("ID de libro no válido");
        error.status = 400;
        throw error;
    }

    const libro = await Libro.findOne({ _id: idLibro, activo: true });
    if (!libro) {
        const error = new Error("Libro no encontrado o inactivo");
        error.status = 404;
        throw error;
    }

    const result = await Review.aggregate([
        { $match: { libro: new mongoose.Types.ObjectId(idLibro) } },
        {
            $group: {
                _id: null,
                promedio: { $avg: "$calificacion" }
            }
        }
    ]);

    return result.length > 0 ? result[0].promedio : -1;
};
export const getReviewsByLibroService = async (idLibro) => {
    if (!isValidObjectId(idLibro)) {
        const error = new Error("ID de libro no válido");
        error.status = 400;
        throw error;
    }
    const libro = await Libro.findOne({ _id: idLibro, activo: true });
    if (!libro) {
        const error = new Error("Libro no encontrado o inactivo");
        error.status = 404;
        throw error;
    }
    const reviews = await Review.find({ libro: idLibro }).populate('usuario', 'nombre -_id');
    return reviews;
};

export const getCapitulosByLibroService = async (id) => {
    if (!isValidObjectId(id)) {
        const error = new Error("ID de libro no válido");
        error.status = 400;
        throw error;
    }
    const libro = await Libro.findOne({ _id: id, activo: true }).populate('listaCapitulos');
    if (!libro) {
        const error = new Error("Libro no encontrado o inactivo");
        error.status = 404;
        throw error;
    }
    return libro.listaCapitulos || [];
};
