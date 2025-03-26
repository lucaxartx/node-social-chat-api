import { getProfile, updateProfile } from "../controllers/profile.controller";
import express from "express";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router()


router
    .route('/')
    .get(authMiddleware, getProfile)
    .patch(authMiddleware, updateProfile)

export default router