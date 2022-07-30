import React, { useEffect } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import React from "react";
import Slider from "react-slick";
// import Carousel from "react-material-ui-carousel"
// import Product from '../Home/Product'
import "./ProductDetails.css"
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails } from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import ReviewCard from './ReviewCard';
import Loader from '../Layout/Loading/Loader';
import { useAlert } from 'react-alert';


const ProductDetails = ()=>{
    const dispatch = useDispatch();
    const {id} = useParams();
    const alert = useAlert();

    const {product,loading,error}= useSelector((state)=>state.productDetails)
    useEffect(()=>{
       if(error){
       alert.error(error)
       dispatch(clearErrors())
       }
      


        dispatch(getProductDetails(id))
        
    },[dispatch,id,error,alert])
    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
      };

      var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

      return(
        <>
        {
          loading ? <Loader/> :
          (<>
            <div className="ProductDetails">
               <div className='w-1/2 border border-black-500'>
               <Slider {...settings} className='w-1/2 border border-black'>
         {product.images &&
                     product.images.map((item, i) => (
                       <div>
                       <img
                         // className="CarouselImage"
                         key={i}
                         src={item.url}
                         alt={`${i} Slide`}
                         />
                         </div>
                     ))}
         {/* <div>
           <h3>2</h3>
         </div>
         <div>
           <h3>3</h3>
         </div>
         <div>
           <h3>4</h3>
         </div>
         <div>
           <h3>5</h3>
         </div>
         <div>
           <h3>6</h3>
         </div> */}
       </Slider>
                 {/* <Carousel>
                   {product.images &&
                     product.images.map((item, i) => (
                       <img
                         className="CarouselImage"
                         key={i}
                         src={item.url}
                         alt={`${i} Slide`}
                       />
                     ))}
                 </Carousel> */}
               </div>
   
               <div>
                 <div className="detailsBlock-1">
                   <h2>{product.name}</h2>
                   <p>Product # {product._id}</p>
                 </div>
                 <div className="detailsBlock-2">
                   <ReactStars {...options} />
                   <span className="detailsBlock-2-span">
                     {" "}
                     ({product.numOfReviews} Reviews)
                   </span>
                 </div>
                 <div className="detailsBlock-3">
                   <h1>{`₹${product.price}`}</h1>
                   <div className="detailsBlock-3-1">
                     <div className="detailsBlock-3-1-1">
                       <button >-</button>
                       <input readOnly type="number" value={1} />
                       <button >+</button>
                     </div>
                     <button
                       disabled={product.Stock < 1 ? true : false}
                       
                     >
                       Add to Cart
                     </button>
                   </div>
   
                   <p>
                     Status:
                     <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                       {product.Stock < 1 ? "OutOfStock" : "InStock"}
                     </b>
                   </p>
                 </div>
   
                 <div className="detailsBlock-4">
                   Description : <p>{product.description}</p>
                 </div>
   
                 <button  className="submitReview">
                   Submit Review
                 </button>
               </div>
             </div>
   
             <h3 className="reviewsHeading text-black text-lg text-center border-b-2 border-black w-20 mx-auto p-2">REVIEWS</h3>
   
              {product.reviews && product.reviews[0] ? (
               <div className='reviews'>
                 {product.reviews && product.reviews.map((review)=> <ReviewCard review = {review}/>)}
   
               </div>
             ):
             (
               <p className='noReviews text-center text-2xl p-3  text-gray-700 '>No reviews there</p>
             ) 
           }
   {/* 
             <Dialog
               aria-labelledby="simple-dialog-title"
               open={open}
               onClose={submitReviewToggle}
             >
               <DialogTitle>Submit Review</DialogTitle>
               <DialogContent className="submitDialog">
                 <Rating
                   onChange={(e) => setRating(e.target.value)}
                   value={rating}
                   size="large"
                 />
   
                 <textarea
                   className="submitDialogTextArea"
                   cols="30"
                   rows="5"
                   value={comment}
                   onChange={(e) => setComment(e.target.value)}
                 ></textarea>
               </DialogContent>
               <DialogActions>
                 <Button onClick={submitReviewToggle} color="secondary">
                   Cancel
                 </Button>
                 <Button onClick={reviewSubmitHandler} color="primary">
                   Submit
                 </Button>
               </DialogActions>
             </Dialog> */}
   
             {/* {product.reviews && product.reviews[0] ? (
               <div className="reviews">
                 {product.reviews &&
                   product.reviews.map((review) => (
                     <ReviewCard key={review._id} review={review} />
                   ))}
               </div>
                ) : (
                 <p className="noReviews">No Reviews Yet</p>
               )} */}
           </>)
        }</>
        
      )

    
}



export default ProductDetails