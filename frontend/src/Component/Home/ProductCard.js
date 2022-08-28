import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"


const Product = ({product}) => {
  const options={
      edit:false,
      color:"rgba(20,20,20,0.1)",
      activeColor:"tomato",
      value:product.ratings,
      size:window.innerWidth < 600 ? 20 : 25,
      isHalf:true
  
  }
  return (
    <>
    <Link className='productCard ' to={`/product/${product._id}`} >
        <img className='' src={(product.images[0].url)} alt={product.name}/>
        <p className=''>{product.name}</p> 
        <div className=''>
           <ReactStars {...options} /><span className='text-xs'>({product.noOfReviews} Reviews)</span>
        </div>
        <span className='m-1 text-red-500'>{`₹${product.price}`}</span>

    
    {/* <div>Product</div> */}
    
    </Link>
    
    </>
  )
}

export default Product