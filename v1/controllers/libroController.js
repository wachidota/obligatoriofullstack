import {
    createLibroService,
    getAllLibrosService,
    getLibroByIdService,
    updateLibroService,
    deleteLibroService,
    getPromedioCalificacionesService,
    getLibrosByCategoriaService,
    getCapitulosByLibroService,
    getReviewsByLibroService
} from "../services/libroService.js";

// Crear libro
export const createLibro = async (req, res, next) => {

    try {

        const {

            titulo,
            CategoriaLista,
            descripcion,
            portada

        } = req.validatedBody || req.body;

        const autorId = req.user.id;

        const libro = await createLibroService(

            titulo,
            autorId,
            CategoriaLista,
            descripcion,
            portada

        );

        res.status(201).json({

            mensaje: "Libro creado",

            libro

        });

    }

    catch (err) {

        next(err);

    }

};

// Obtener todos
export const getAllLibros = async (req, res, next) => {
    try {
        const libros = await getAllLibrosService();

        res.json({
            mensaje: "Libros obtenidos",
            libros
        });

    } catch (err) {
        next(err);
    }
};

// Obtener por ID
export const getLibroById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const libro = await getLibroByIdService(id);

        if (!libro) {
            return next({ status: 404, message: "Libro no encontrado" });
        }

        res.json({
            mensaje: "Libro encontrado",
            libro
        });

    } catch (err) {
        next(err);
    }
};

// Actualizar
export const updateLibro = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.validatedBody || req.body;

        const libro = await updateLibroService(id, updates);

        if (!libro) {
            return next({ status: 404, message: "Libro no encontrado" });
        }

        res.json({
            mensaje: "Libro actualizado",
            libro
        });

    } catch (err) {
        next(err);
    }
};

// Eliminar
export const deleteLibro = async (req, res, next) => {
    try {
        const { id } = req.params;

        const libro = await deleteLibroService(id);

        if (!libro) {
            return next({ status: 404, message: "Libro no encontrado" });
        }

        res.json({
            mensaje: "Libro eliminado",
            libro
        });

    } catch (err) {
        next(err);
    }
};

// Promedio de calificaciones
export const getPromedioCalificaciones = async (req, res, next) => {
    try {
        const { id } = req.params;

        const promedio = await getPromedioCalificacionesService(id);

        res.json({
            mensaje: "Promedio calculado",
            promedio
        });

    } catch (err) {
        next(err);
    }
};

// Libros por categoría
export const getLibrosByCategoria = async (req, res, next) => {
    try {
        const { categoria } = req.params;

        const libros = await getLibrosByCategoriaService(categoria);

        res.json({
            mensaje: "Libros obtenidos por categoría",
            libros
        });

    } catch (err) {
        next(err);
    }
};

// Capítulos
export const getCapitulosByLibro = async (req, res, next) => {
    try {
        const { id } = req.params;

        const capitulos = await getCapitulosByLibroService(id);

        res.json({
            mensaje: "Capítulos obtenidos",
            capitulos
        });

    } catch (err) {
        next(err);
    }
};

// Reviews
export const getReviewsByLibro = async (req, res, next) => {
    try {
        const { id } = req.params;

        const reviews = await getReviewsByLibroService(id);

        res.json({
            mensaje: "Reviews obtenidos",
            reviews
        });

    } catch (err) {
        next(err);
    }
};