import express from "express";
import { getPizzas, getPizzasByCategory, getPizzasBySearch } from "../controllers/pizzaController.js";

const router = express.Router()


// GET All PIZZAS
router.get("/", getPizzas)
router.get("/category", getPizzasByCategory)
router.get("/search", getPizzasBySearch)


export default router