import  Mongoose  from "mongoose";
import  Libro  from "./LibroModel.js";
import  Usuario  from "./UsuarioModel.js";
const ReviewSchema = new Mongoose.Schema({  
    libro: { type: Mongoose.Schema.Types.ObjectId, ref: "Libro", required: true },
    usuario: { type: Mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    calificacion: { type: Number, required: true, min: 1, max: 5 },
    comentario: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});
export default Mongoose.model("review", ReviewSchema) ;