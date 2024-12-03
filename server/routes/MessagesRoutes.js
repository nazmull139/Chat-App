import { Router } from "express";
import multer from "multer";
import { getMessages, uploadFile } from "../controllers/MessagesController.js";
import { verifyToken } from "../middlewares/AuthMIddleware.js";

const messagesRoutes = Router();
const upload = multer({dest: "uploads/files"});
messagesRoutes.post("/get-messages", verifyToken , getMessages);
messagesRoutes.post("/upload-file",verifyToken,upload.single("file"),uploadFile)

export default messagesRoutes;