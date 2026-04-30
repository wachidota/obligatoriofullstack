import mongoose from "mongoose";
import  Libro  from "./LibroModel.js";
const UsuarioSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    premium: { type: Boolean, default: false , required: true },
    ultimoLogin: { type: Date, default: Date.now },
    listaLibrosLeidos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Libro" }],
    listaLibrosEscritos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Libro" }],
    activo: { type: Boolean, default: true }
});
export default mongoose.model("Usuario", UsuarioSchema);