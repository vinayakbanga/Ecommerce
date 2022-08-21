const express = require("express");

const app = express()
const errorMiddleware = require("./middleware/error")
const cookieParser= require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload= require("express-fileupload")
const dotenv = require('dotenv')

dotenv.config({path:"backend/config/.env"})


app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

//Routes
const product = require("./routes/productRoute")
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoute")

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);


//Middleware for error
app.use(errorMiddleware)


module.exports= app