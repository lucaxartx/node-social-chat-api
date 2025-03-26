import { getProfile, updateProfile, uploadImage } from "../controllers/profile.controller";
import express from "express";
import { authMiddleware } from "../middlewares/auth";
import upload from "../middlewares/mutler";

const router = express.Router()


router
    .route('/')
    .get(authMiddleware, getProfile)
    .patch(authMiddleware, updateProfile)

router.post('/upload', upload.array('img'), uploadImage)

export default router