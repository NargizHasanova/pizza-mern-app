import express from "express";
import { signin, signup, sendOrder } from "../controllers/userController.js";
const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/sendOrder/:userId', sendOrder)


export default router
