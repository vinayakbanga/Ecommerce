const ErrorHandler = require("../utils/errorhandler");
const catchAsyncerrors = require("./catchAsyncerrors");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
exports.isAuthenticatedUser = catchAsyncerrors(async(req,res,next)=>{
   const {token}= req.cookies;
   
//    console.log(token);
if(!token){
    return next(new ErrorHandler("Please login to acces this route",401))
}

const decodedData=jwt.verify(token,process.env.JWT_SECRET);

req.user=await User.findById(decodedData.id);
next()

});

exports.authorizedRoles=(...roles)=>{
    return (req,res,next) => {
        //to check for admin role
         if (!roles.includes(req.user.role)){
           return next (new ErrorHandler(`Role ${req.user.role} is not allowed to acces this resources`,403))

         }
         next();
    }
}