import express from "express";
import { authorizationMiddleware } from "./middlewares/authorization.middleware.js";
import authRoutes from "./routes/authRoutes.js";
import categoriaRoutes from "./routes/CategoriaRoutes.js";
import libroRoutes from "./routes/LibroRoutes.js";
import capituloRoutes from "./routes/capituloRoutes.js";
import comentarioRoutes from "./routes/comentarioRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import usuarioRoutes from "./routes/UsuarioRoutes.js";


const Router = express.Router({mergeParams: true});

//rutas desprotegidas
Router.use('/auth', authRoutes);



Router.use(authorizationMiddleware);
//rutas protegidas
Router.use('/categorias', categoriaRoutes);
Router.use('/libros', libroRoutes);
Router.use('/capitulos', capituloRoutes);
Router.use('/comentarios', comentarioRoutes);
Router.use('/reviews', reviewRoutes);
Router.use('/usuarios', usuarioRoutes);



export default Router;