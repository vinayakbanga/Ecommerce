const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")



const userSchema = new mongoose.Schema({
    name:{type:String,required:[true,"Please Enter your name"]},
    email:{type:String,required:[true,"Please Enter your email"],unique:true,validate:[validator.isEmail,"Please enter a valid email"]},
    password:{type:String,required:[true,"Please Enter your password"],
           minlength:[8,"Password Should be 8 ch long"],select:false},
    avatar:{
        public_id:{type:String,required:true},
        url:{type:String,required:true},
    },
    role:{type:String,default:"user"},
    resetPasswordToken:String,
    resetPasswordExpire:Date

});
userSchema.pre("save",async function(next){
    
    if(!this.isModified("password")){
        next();
    }

    this.password=await bcrypt.hash(this.password,10)
})

//JWT Token

userSchema.methods.getJWTToken= function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}



//compare password
userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
};

//genrating password reset token
userSchema.methods.getResetPasswordToken = function(){

   //gentrating token
   const resetToken = crypto.randomBytes(20).toString("hex");

   //hashing and adding to using schema

   this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex")
   this.resetPasswordExpire = Date.now() + 15* 60 * 1000;

   return resetToken;


}

module.exports=mongoose.model("User",userSchema)