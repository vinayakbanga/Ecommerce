import React, { useEffect,useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import React from "react";
import Slider from "react-slick";
// import Carousel from "react-material-ui-carousel"
// import Product from '../Home/Product'
import "./ProductDetails.css"
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails,newReview } from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import ReviewCard from './ReviewCard';
import Loader from '../Layout/Loading/Loader';
import { useAlert } from 'react-alert';
import { addItemsToCart } from '../../actions/cartAction';
import { Dialog,DialogActions,DialogContent,DialogTitle,Button } from '@mui/material';
import Rating from "@mui/material/Rating"
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
// NEW_REVIEW_RESET
const ProductDetails = ()=>{
    const dispatch = useDispatch();
    const {id} = useParams();
    const alert = useAlert();

    const {product,loading,error}= useSelector((state)=>state.productDetails)
    const { success, error: reviewError } = useSelector(
      (state) => state.newReview
    );
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
        
      const [quantity,setQuantity] = useState(1);
      const [open, setOpen] = useState(false);
      const [rating, setRating] = useState(0);
      const [comment, setComment] = useState("");


       const increaseQuantity=()=>{
        if(product.stock<=quantity)
        return;
        const qty = quantity +1;
        setQuantity(qty)
       }
       const decreaseQuantity=()=>{
        if(1>=quantity)
        return;
        const qty = quantity -1;
        setQuantity(qty)
       }
       

       const addToCartHandler = ()=>{
        dispatch(addItemsToCart(id,quantity));
        alert.success("Items added to cart");

       }


       const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
      };
    
      const reviewSubmitHandler = () => {
        const myForm = new FormData();
    
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);
    
        dispatch(newReview(myForm));
    
        setOpen(false);
      };
    
      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (reviewError) {
          alert.error(reviewError);
          dispatch(clearErrors());
        }
    
        if (success) {
          alert.success("Review Submitted Successfully");
          dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(id));
      }, [dispatch, id,  error, alert,reviewError,success]);
    
       
      return(
        <>
        {
          loading ? <Loader/> :
          (<>
            <div className="ProductDetails">
               <div className='w-1/2 '>
               <Slider {...settings} className='w-1/2 '>
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
                   <Rating {...options} />
                   <span className="detailsBlock-2-span">
                     {" "}
                     ({product.noOfReviews} Reviews)
                   </span>
                 </div>
                 <div className="detailsBlock-3">
                   <h1>{`₹${product.price}`}</h1>
                   <div className="detailsBlock-3-1">
                     <div className="detailsBlock-3-1-1">
                     <button onClick={decreaseQuantity} >-</button>
                    {/* <input type="number" value={} /> */}
                    <span className=' p-3 '> {quantity}</span>
                    
                    <button onClick={increaseQuantity} >+</button>
                     </div>
                     <button
                       disabled={product.stock < 1 ? true : false}
                       onClick={addToCartHandler}
                       
                     >
                       Add to Cart
                     </button>
                   </div>
   
                   <p>
                     Status:
                     <b className={product.stock < 1 ? "text-red-500" : "text-green-500"}>
                       {product.stock < 1 ? "OutOfStock" : "InStock"}
                     </b>
                   </p>
                 </div>
   
                 <div className="detailsBlock-4">
                   Description : <p>{product.description}</p>
                 </div>
   
                 <button onClick={submitReviewToggle}  className="submitReview">
                   Submit Review
                 </button>
               </div>
             </div>
   
             <h3 className="reviewsHeading text-black text-lg text-center border-b-2 border-black w-20 mx-auto p-2">REVIEWS</h3>
   
               
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
                 <Button onClick={reviewSubmitHandler}   color="primary">
                   Submit
                 </Button>
               </DialogActions>
             </Dialog>

               

              {product.reviews && product.reviews[0] ? (
               <div className='reviews flex gap-2'>
                 {product.reviews && product.reviews.map((review)=> <ReviewCard review = {review}/>)}
   
               </div>
             ):
             (
               <p className='noReviews text-center text-2xl p-3  text-gray-700 '>No reviews there</p>
             ) 
           }
   
   
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