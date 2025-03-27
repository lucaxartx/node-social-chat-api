import { Router } from "express";
import { signup, login, logout, allUsers } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/', allUsers)

export default router;