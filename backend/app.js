const express = require("express");

const app = express()
const errorMiddleware = require("./middleware/error")
const cookieParser= require("cookie-parser")

app.use(express.json())
app.use(cookieParser())


//Routes
const product = require("./routes/productRoute")
const user = require("./routes/userRoutes");

app.use("/api/v1",product);
app.use("/api/v1",user);


//Middleware for error
app.use(errorMiddleware)


module.exports= app