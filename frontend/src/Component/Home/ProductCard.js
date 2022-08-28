import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"
import { Rating } from '@mui/material'


const Product = ({product}) => {
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
    <Link className='productCard ' to={`/product/${product._id}`} >
        <img className='' src={(product.images[0].url)} alt={product.name}/>
        <p className=''>{product.name}</p> 
        <div className=''>
           <Rating {...options} /><span className='text-xs'>({product.noOfReviews} Reviews)</span>
        </div>
        <span className='m-1 text-red-500'>{`₹${product.price}`}</span>

    
    {/* <div>Product</div> */}
    
    </Link>
    
    </>
  )
}

export default Product