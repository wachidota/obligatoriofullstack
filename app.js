import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./v1/config/db.js";
import v1Router from "./v1/v1.routes.js";
import { notFoundMiddleware } from "./v1/middlewares/notFound.middleware.js";
import { errorMiddleware } from "./v1/middlewares/error.middleware.js";

dotenv.config();

const app = express();

// 🔌 Conexión DB (segura para serverless)
if (process.env.MONGODB_URI) {
    connectDB();
} else {
    console.error("❌ MONGODB_URI no definido");
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ mensaje: "API funcionando" });
});

app.use("/v1", v1Router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;