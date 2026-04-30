import express from "express";
import { getUsuarioById,
    setUsuarioPremium,
    deactivateUsuario,
    updateUsuarioPassword,
    addLibroLeido,
    removeLibroLeido,
    getLibrosEcritos,
    getLibrosLeidos} from "../controllers/usuarioController.js";
import  {validateBodyMiddleware}  from "../middlewares/validateBody.middleware.js";
import { actualizarPasswordSchema, agregarLibroLeidoSchema } from "../validators/usuario.validator.js";
const router = express.Router();

router.get('/:id', getUsuarioById);
router.put('/:id/premium', setUsuarioPremium);
router.delete('/:id/deactivate', deactivateUsuario);
router.put('/:id/password', validateBodyMiddleware(actualizarPasswordSchema), updateUsuarioPassword);
router.post('/:id/libros-leidos', validateBodyMiddleware(agregarLibroLeidoSchema), addLibroLeido);
router.delete('/:id/libros-leidos/:libroId', removeLibroLeido);
router.get('/:id/libros-escritos', getLibrosEcritos);
router.get('/:id/libros-leidos', getLibrosLeidos);

export default router;