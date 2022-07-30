
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

exports.getAllProducts= catchAsyncErrors (async (req,res,next)=>{
  
  
  
  const resultPerPage= 8;
let productCount = await Product.countDocuments();


  const apiFeature=new ApiFeatures(Product.find(),req.query). search().filter().pagination(resultPerPage)
  let products =await apiFeature.query;


    // const product=await apiFeature.query
res.status(200).json({
    success:true,
        products,
        productCount,
        resultPerPage

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

//create new review orupdate the review

// 
// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.noOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
  
// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const noOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      noOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});