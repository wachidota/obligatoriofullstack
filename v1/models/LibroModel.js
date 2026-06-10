import mongoose from "mongoose";
import  Categoria  from "./CategoriaModel.js";
import Capitulo from "./capituloModel.js";
import  Usuario  from "./UsuarioModel.js";
const LibroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    categoriaLista: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categoria", required: true }],
    descripcion: { type: String, required: true },
    portada: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
    listaCapitulos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Capitulo"  },],
    activo: { type: Boolean, default: true }
});
export default mongoose.model("Libro", LibroSchema);
   