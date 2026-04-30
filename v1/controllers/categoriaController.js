import {
    createCategoriaService,
    getAllCategoriasService,
    getCategoriaByIdService,
    deleteCategoriaService
} from "../services/categoriaService.js";

import { obtenerTopTags } from "../services/APIScrapperService.js";

// Crear categoría
export const createCategoria = async (req, res, next) => {
    try {
        const { nombre } = req.validatedBody || req.body;

        const categoria = await createCategoriaService(nombre);

        res.status(201).json({
            mensaje: "Categoría creada",
            categoria
        });

    } catch (err) {
        next(err);
    }
};

// Obtener todas
export const getAllCategorias = async (req, res, next) => {
    try {
        const categorias = await getAllCategoriasService();

        res.json({
            mensaje: "Categorías obtenidas",
            categorias
        });

    } catch (err) {
        next(err);
    }
};

// Obtener por ID
export const getCategoriaById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const categoria = await getCategoriaByIdService(id);

        if (!categoria) {
            return next({
                status: 404,
                message: "Categoría no encontrada"
            });
        }

        res.json({
            mensaje: "Categoría encontrada",
            categoria
        });

    } catch (err) {
        next(err);
    }
};

// Eliminar categoría
export const deleteCategoria = async (req, res, next) => {
    try {
        const { id } = req.params;

        const categoria = await deleteCategoriaService(id);

        if (!categoria) {
            return next({
                status: 404,
                message: "Categoría no encontrada"
            });
        }

        res.json({
            mensaje: "Categoría eliminada",
            categoria
        });

    } catch (err) {
        next(err);
    }
};

// Top categorías
export const topCategorias = async (req, res, next) => {
    try {
        const tags = await obtenerTopTags();

        res.json({
            mensaje: "Top categorías obtenidas",
            tags
        });

    } catch (err) {
        next(err);
    }
};