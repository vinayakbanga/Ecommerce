const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    shippingInfo: {
        address:{type:String,requird:true},
        city:{type:String,requird:true},
        state:{type:String,requird:true},
        country:{type:String,requird:true},
        pincode:{
            type:Number,required:true
        },
        phoneNo:{
            type:Number,required:true
        }
    },
    orderItems:[
        {
            name:{type:String,requird:true},
            price:{type:Number,requird:true},
            quantity:{type:Number,required:true},
            image:{type:String,requird:true},
            product:{type: mongoose.Schema.ObjectId,
                      ref:"Product",
                      required:true }
        },
        

    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    paymentInfo:{
        id:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        }
    },
    paidAt:{
        type:Date,
        required:true
    },
    itemPrice:{
        type:Number,
        default:0,
        required:true
    },
    taxPrice:{
        type:Number,
        default:0,
        required:true
    },
    shippingPrice:{
        type:Number,
        default:0,
        required:true
    },
    totalPrice:{
        type:Number,
        default:0,
        required:true
    },
    orderStatus:{
        type:String,
        required:true,
        default:"Processing"
    },
    deliveredAt:Date,
    createdAt:{
        type:Date,
        default:Date.now
    },


})

module.exports = mongoose.model("Order",orderSchema)