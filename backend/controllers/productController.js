
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncerrors");
const ApiFeatures = require("../utils/apifeatures");

//create product--->admin

exports.createProduct= catchAsyncErrors(async (req,res,next)=>{

      req.body.user=req.user.id

    const product= await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
})

// async (req,res,next)=>{
//     const product= await Product.create(req.body);

//     res.status(201).json({
//         success:true,
//         product
//     })
// }


//Get all products

exports.getAllProducts= catchAsyncErrors (async (req,res)=>{
  const resultPerPage= 5;
const productCount = await Product.countDocuments();


  const apiFeature=new ApiFeatures(Product.find(),req.query). search().filter().pagination(resultPerPage)
  let products =await apiFeature.query;


    // const product=await apiFeature.query
res.status(200).json({
    success:true,
        products,
        productCount

})

})


//get product details
exports.getProductDetails = catchAsyncErrors (async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    else{
        res.status(200).json({
            success:true,
            product,
            
        })

    }
    

})


//update products --> admin
exports.updateProduct = catchAsyncErrors (async(req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        // return res.status(500).json({
        //     success:false,
        //     message:"Product not found"
        // })
        return next(new ErrorHandler("Product not found",404))
    }
    product= await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false})

    res.status(200).json({
        success:true,
        product

    })

})


//Dlete Product


exports.deleteProduct = catchAsyncErrors (async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        // res.status(500).json({
        //     sucess:false,
        //     message:"Product not found"
        // })
        return next(new ErrorHandler("Product not found",404))
    }
    else{

        await product.remove();
    
        res.status(200).json({
            success:true,
            message:"Product Deleted succesfully"
        })
    }


})