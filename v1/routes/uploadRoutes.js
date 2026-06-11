import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("El archivo debe ser una imagen"));
        }

        cb(null, true);
    }
});

router.post("/upload", upload.single("imagen"), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: "No se envio ninguna imagen"
            });
        }

        const base64Image =
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        const result = await cloudinary.uploader.upload(base64Image, {
            folder: "storyhub/portadas"
        });

        res.status(201).json({
            mensaje: "Imagen subida correctamente",
            url: result.secure_url,
            publicId: result.public_id
        });
    } catch (error) {
        next(error);
    }
});

export default router;
