import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"

const options={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    value:2.5,
    size:window.innerWidth < 600 ? 20 : 25,
    isHalf:true

}

const Product = ({product}) => {
  return (
    <>
    <Link className='productCard ' to={product._id} >
        <img className='' src={product.image[0].url} alt={product.name}/>
        <p className=''>{product.name}</p> 
        <div className=''>
           <ReactStars {...options} /><span className='text-xs'>(256 Reviews)</span>
        </div>
        <span className='m-1 text-red-500'>{product.price}</span>

    
    {/* <div>Product</div> */}
    
    </Link>
    
    </>
  )
}

export default Product