import mongoose from "mongoose";
const CategoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  activo: {
    type: Boolean,
    default: true
  }
});
export default mongoose.model("Categoria", CategoriaSchema) ;