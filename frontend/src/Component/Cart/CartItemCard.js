import React from 'react'
import { Link } from 'react-router-dom'

const CartItemCard = ({item}) => {
  return (
    <div className='CartItemCard  flex  items-center  '>
      <img src={item.image} alt="sample" className=' w-12 md:w-28'/>
      <div className='flex flex-col'>
        <Link to ={`/product/${item.product}`} >{item.name}</Link>
        <span>{`Price :₹ ${item.price}`}</span>
        {/* <p className='text-sm font-thin text-orange-500'>Remove</p> */}
      </div>
    </div>
  )
}

export default CartItemCard