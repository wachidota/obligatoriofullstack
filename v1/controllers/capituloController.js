import {
    createCapituloService,
    getCapituloByIdService,
    updateCapituloService,
    deleteCapituloService,
    getCapitulosAdyacentesService,
    getComentariosByCapituloService
} from "../services/capituloService.js";

// Crear capítulo
export const createCapitulo = async (req, res, next) => {
    try {
        const { titulo, contenido, numero, libroId } =
            req.validatedBody || req.body;

        const capitulo = await createCapituloService(
            titulo,
            contenido,
            numero,
            libroId,
            req.user.id
        );

        res.status(201).json({
            mensaje: "Capítulo creado",
            capitulo
        });

    } catch (err) {
        next(err);
    }
};

// Obtener capítulo
export const getCapituloById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const capitulo = await getCapituloByIdService(id);

        if (!capitulo) {
            return next({
                status: 404,
                message: "Capítulo no encontrado"
            });
        }

        const capituloResponse = capitulo.toObject();
        capituloResponse.isAuthor = capitulo.libro?.autor?.toString() === req.user.id;
        if (capituloResponse.libro) {
            delete capituloResponse.libro.autor;
        }

        res.json({
            mensaje: "Capítulo encontrado",
            capitulo: capituloResponse
        });

    } catch (err) {
        next(err);
    }
};

// Actualizar capítulo
export const updateCapitulo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.validatedBody || req.body;

        const capitulo = await updateCapituloService(id, updates, req.user.id);

        if (!capitulo) {
            return next({
                status: 404,
                message: "Capítulo no encontrado"
            });
        }

        res.json({
            mensaje: "Capítulo actualizado",
            capitulo
        });

    } catch (err) {
        next(err);
    }
};

// Eliminar capítulo
export const deleteCapitulo = async (req, res, next) => {
    try {
        const { id } = req.params;

        const capitulo = await deleteCapituloService(id, req.user.id);

        if (!capitulo) {
            return next({
                status: 404,
                message: "Capítulo no encontrado"
            });
        }

        res.json({
            mensaje: "Capítulo eliminado",
            capitulo
        });

    } catch (err) {
        next(err);
    }
};

// Capítulos adyacentes
export const getCapitulosAdyacentes = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { anterior, siguiente } =
            await getCapitulosAdyacentesService(id);

        res.json({
            mensaje: "Capítulos adyacentes obtenidos",
            anterior,
            siguiente
        });

    } catch (err) {
        next(err);
    }
};

// Comentarios del capítulo
export const getComentariosByCapitulo = async (req, res, next) => {
    try {
        const { id } = req.params;

        const comentarios =
            await getComentariosByCapituloService(id);

        res.json({
            mensaje: "Comentarios obtenidos",
            comentarios
        });

    } catch (err) {
        next(err);
    }
};
