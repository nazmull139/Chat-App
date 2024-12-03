import { Router } from "express";
import multer from "multer";
import { addProfileImage, getUserInfo, login, logout, removeProfileImage, signup, updateProfile } from "../controllers/AuthControllers.js";
import { verifyToken } from "../middlewares/AuthMIddleware.js";

const upload = multer({dest:"uploads/profiles/"});
const authRoutes = Router();


authRoutes.post("/signup",signup);
authRoutes.post("/login",login);
authRoutes.get("/user-info",verifyToken, getUserInfo);
authRoutes.post("/update-profile",verifyToken, updateProfile);
authRoutes.post("/add-profile-image",verifyToken,upload.single("profile-image"), addProfileImage);
authRoutes.delete("/remove-profile-image",verifyToken, removeProfileImage)
authRoutes.post("/logout", logout); 

export default authRoutes; 