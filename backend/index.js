import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import pizzaRoutes from "./routes/pizzaRoute.js"
import usersRoutes from "./routes/usersRoute.js"

const app = express()
dotenv.config()
app.use(cors())
app.use(cookieParser())
app.use(express.json())

// routes
app.use("/pizzas", pizzaRoutes)
app.use("/user", usersRoutes)


mongoose.set('strictQuery', false);

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB ok"))
    .catch(err => console.log('DB error', err))

app.listen(process.env.PORT || 5000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("SERVER OK");
})

