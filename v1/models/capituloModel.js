import mongoose from "mongoose";
import  Libro  from "./LibroModel.js";
const CapituloSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    numero: { type: Number, required: true },
    libro: { type: mongoose.Schema.Types.ObjectId, ref: "Libro", required: true },
});
export default mongoose.model("Capitulo", CapituloSchema);
