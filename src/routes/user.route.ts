import { Router } from "express";
import { signup, signin } from "../controllers/user.controller";


const router = Router();

router.post('/signup', signup)
router.post('/signin', signin)

export default router;