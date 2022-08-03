import React, { useEffect } from 'react'
import Carousel from "react-material-ui-carousel"
// import Product from '../Home/Product'
import "./ProductDetails.css"
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails } from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import ReviewCard from "./ReviewCard.js"
import MetaData from '../Layout/MetaData'



const ProductDetails = () => {

    const dispatch = useDispatch();
    const {id} = useParams();

    const {product,loading,error}= useSelector((state)=>state.productDetails)
    useEffect(()=>{
        dispatch(getProductDetails(id))
        
    },[dispatch,id])
    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
      };
  return (
    <>
    
    {/* <div className="ProductDetails">
        <div>
            <Carousel>
                {product.images && product.images.map((item,i)=>(
                    <img className='CarouselImage' key={item.url}
                    src={item.url}
                    alt={`${i} Slide`}/>
                ))}

            </Carousel>
        </div>
        <div>
            <div className='="detailsBlock-1'>
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>

            </div>
             <div className='detailsBlock-2'>
                <ReactStars{...options}/>
                <span>({product.noOfReviews} Reviews)</span>
             </div>
             <div className='detailsBlock-3'>
                <h1>`${product.price}`</h1>
             </div>
        </div>


    </div> */}
    <MetaData title="PRODUCTDETAILS--ECOMMERCE"/>
     <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
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
          <h1 className='reviewsHeading'>Reviews</h1>

          {/* {product.reviews && product.reviews[0] ? (
            <div className='reviews'>
              {product.reviews && product.reviews.map((review)=> <ReviewCard review = {review}/>)}

            </div>
          ):
          (
            <p className='noReviews'>No reviews there</p>
          ) 
        } */}
    </>
  )
}

export default ProductDetails