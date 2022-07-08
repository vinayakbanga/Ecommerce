const app = require("./app")
const dotenv = require('dotenv')
const connectDatabase =require("./config/database")


//config

dotenv.config({path:"backend/config/.env"})

//connecting to db
connectDatabase()

console.log(process.env.PORT);

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on ${process.env.PORT}`);
})