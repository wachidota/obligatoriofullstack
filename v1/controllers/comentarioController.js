import {
    createComentarioService,
    getComentarioByIdService,
    deleteComentarioService
} from "../services/comentarioService.js";

// Crear comentario
export const createComentario = async (req, res, next) => {
    try {
        const { contenido, capituloId } =
            req.validatedBody || req.body;

        const autorId = req.user.id; // 🔥 del JWT

        const comentario = await createComentarioService(
            contenido,
            autorId,
            capituloId
        );

        res.status(201).json({
            mensaje: "Comentario creado",
            comentario
        });

    } catch (err) {
        next(err);
    }
};

// Obtener comentario
export const getComentarioById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const comentario = await getComentarioByIdService(id);

        if (!comentario) {
            return next({
                status: 404,
                message: "Comentario no encontrado"
            });
        }

        res.json({
            mensaje: "Comentario encontrado",
            comentario
        });

    } catch (err) {
        next(err);
    }
};

// Eliminar comentario
export const deleteComentario = async (req, res, next) => {
    try {
        const { id } = req.params;

        const comentario = await deleteComentarioService(id);

        if (!comentario) {
            return next({
                status: 404,
                message: "Comentario no encontrado"
            });
        }

        res.json({
            mensaje: "Comentario eliminado",
            comentario
        });

    } catch (err) {
        next(err);
    }
};