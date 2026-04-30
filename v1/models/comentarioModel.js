import mongoose from "mongoose";
import usuario from "./UsuarioModel.js";
import capitulo from "./capituloModel.js";
const ComentarioSchema = new mongoose.Schema({
    contenido: { type: String, required: true },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    capitulo: { type: mongoose.Schema.Types.ObjectId, ref: "Capitulo", required: true }
});
export default mongoose.model("Comentario", ComentarioSchema);