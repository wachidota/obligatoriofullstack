import { getUsuarioByIdService,
    setUsuarioPremiumService,
    deactivateUsuarioService,
    updateUsuarioPasswordService,
    addLibroLeidoService,
    removeLibroLeidoService,
    getLibrosEcritosService,
    getLibrosLeidosService
} from "../services/UsuarioService.js";


// Obtener usuario por ID
export const getUsuarioById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuario = await getUsuarioByIdService(id);

        if (!usuario) {
            return next({ status: 404, message: "Usuario no encontrado" });
        }

        res.json({ mensaje: "Usuario encontrado", usuario });
    } catch (err) {
        next(err);
    }
};

// Hacer usuario premium
export const setUsuarioPremium = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuario = await setUsuarioPremiumService(id);

        res.json({ mensaje: "Usuario actualizado a premium", usuario });
    } catch (err) {
        next(err);
    }
};

// Desactivar usuario
export const deactivateUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuario = await deactivateUsuarioService(id);

        res.json({ mensaje: "Usuario desactivado", usuario });
    } catch (err) {
        next(err);
    }
};

// Actualizar contraseña (usando validatedBody)
export const updateUsuarioPassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nuevaPassword } = req.validatedBody || req.body;

        const usuario = await updateUsuarioPasswordService(id, nuevaPassword);

        res.json({ mensaje: "Contraseña actualizada", usuario });
    } catch (err) {
        next(err);
    }
};

// Agregar libro leído
export const addLibroLeido = async (req, res, next) => {
    try {
        const { id, idLibro } = req.params; // ✅ ahora ambos vienen de la URL

        const usuario = await addLibroLeidoService(id, idLibro);

        res.json({ mensaje: "Libro agregado a la lista de leídos", usuario });
    } catch (err) {
        next(err);
    }
};



export const removeLibroLeido = async (req, res, next) => {
    try {
        const { id, idLibro } = req.params; // ✅ ambos vienen de la URL

        const usuario = await removeLibroLeidoService(id, idLibro);

        res.json({ mensaje: "Libro eliminado de la lista de leídos", usuario });
    } catch (err) {
        next(err);
    }
};

// Libros escritos
export const getLibrosEcritos = async (req, res, next) => {
    try {
        const { id } = req.params;
        const libros = await getLibrosEcritosService(id);

        res.json({ mensaje: "Libros escritos por el usuario", libros });
    } catch (err) {
        next(err);
    }
};

// Libros leídos
export const getLibrosLeidos = async (req, res, next) => {
    try {
        const { id } = req.params;
        const libros = await getLibrosLeidosService(id);

        res.json({ mensaje: "Libros leídos por el usuario", libros });
    } catch (err) {
        next(err);
    }
};

