const app = require("./app")
const dotenv = require('dotenv')
const connectDatabase =require("./config/database")


//config

dotenv.config({path:"backend/config/.env"})

//connecting to db
connectDatabase()

console.log(process.env.PORT);

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on ${process.env.PORT}`);
})

//unhandeled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to unhandled promise Rejection");
    
    server.close(()=>{
        process.exit(1)
    })

})