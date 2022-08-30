const app = require("./app")
const dotenv = require('dotenv')
const connectDatabase =require("./config/database")
const cloudinary = require("cloudinary");


//config

if(process.env.NODE_env!=="PRODUCTION"){

    dotenv.config({path:"backend/config/.env"})
}


//connecting to db
connectDatabase();
cloudinary.config(
    {
        cloud_name:process.env.CLOUDINARY_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET
    }
)

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