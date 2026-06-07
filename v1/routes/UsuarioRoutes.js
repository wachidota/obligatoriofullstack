import express from "express";
import { getUsuarioById,
    setUsuarioPremium,
    deactivateUsuario,
    updateUsuarioPassword,
    addLibroLeido,
    removeLibroLeido,
    getLibrosEscritos,
    getLibrosLeidos} from "../controllers/UsuarioController.js";
import  {validateBodyMiddleware}  from "../middlewares/validateBody.middleware.js";
import { actualizarPasswordSchema, agregarLibroLeidoSchema } from "../validators/usuario.validator.js";
const router = express.Router();

router.get('/:id', getUsuarioById);
router.put('/:id/premium', setUsuarioPremium);
router.delete('/:id/deactivate', deactivateUsuario);
router.put('/:id/password', validateBodyMiddleware(actualizarPasswordSchema), updateUsuarioPassword);
router.post('/:id/libros-leidos/:idLibro', addLibroLeido);
router.delete('/:id/libros-leidos/:idLibro', removeLibroLeido);
router.get('/:id/libros-escritos', getLibrosEscritos);
router.get('/:id/libros-leidos', getLibrosLeidos);

export default router;