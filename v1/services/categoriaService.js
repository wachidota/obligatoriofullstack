import Categoria from "../models/CategoriaModel.js";
import { isValidObjectId } from "mongoose";

export const createCategoriaService = async (nombre) => {
    if (!nombre || nombre.trim() === "") {
        const error = new Error("Nombre de categoría requerido");
        error.status = 400;
        throw error;
    }
    
    const nombreTrimmed = nombre.trim();
    const categoriaExistente = await Categoria.findOne({ nombre: nombreTrimmed, activo: true });
    if (categoriaExistente) {
        const error = new Error("La categoría ya existe");
        error.details = "Ya existe una categoría con este nombre";
        error.status = 409;
        throw error;
    }
    
    const categoria = new Categoria({ nombre: nombreTrimmed });
    await categoria.save();
    return categoria;
};

export const getAllCategoriasService = async () => {
    const categorias = await Categoria.find({ activo: true });
    return categorias;
};

export const getCategoriaByIdService = async (id) => {
    if (!isValidObjectId(id)) {
        const error = new Error("ID de categoría no válido");
        error.details = "ID debe ser un ObjectId válido";
        error.status = 400;
        throw error;
    }
    const categoria = await Categoria.findOne({ _id: id, activo: true });
    if (!categoria) {
        const error = new Error("Categoría no encontrada o inactiva");
        error.details = "No existe una categoría activa con el ID proporcionado";
        error.status = 404;
        throw error;
    }
    return categoria;
};

export const deleteCategoriaService = async (id) => {
    if (!isValidObjectId(id)) {
        const error = new Error("ID de categoría no válido");
        error.details = "ID debe ser un ObjectId válido";
        error.status = 400;
        throw error;
    }
    const categoria = await Categoria.findOneAndUpdate(
        { _id: id, activo: true },
        { activo: false },
        { new: true }
    );
    if (!categoria) {
        const error = new Error("Categoría no encontrada o inactiva");
        error.details = "No existe una categoría activa con el ID proporcionado";
        error.status = 404;
        throw error;
    }
    return categoria;
};

