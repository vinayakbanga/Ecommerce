const mongoose = require("mongoose")


const productSchema=new mongoose.Schema({

    name:{type:String,required:[true,"please enter products name"]},
    description:{type:String,required:[true,"please enter desc"]},
    price:{type:Number,required:[true,"please enter Price"]},
    ratings:{type:Number,default:0},
    images:[{
        public_id:{type:String,required:true},
        url:{type:String,required:true},
    }],
    category:{type:String,required:[true,"please enter Category"]},
    stock:{type:Number,required:[true,"please enter stock"],default:1},
    noOfReviews:{type:Number,default:0},
    reviews:[{
        name:{type:String,required:true},
        rating:{type:Number,required:true},
        comment:{type:String},
    }],
    


},{timestamps:true})


module.exports=mongoose.model("Poducts",productSchema)
