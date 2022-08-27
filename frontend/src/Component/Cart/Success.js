import React from 'react'
import { BiCheckCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='orderSuccess flex flex-col items-center justify-center h-screen gap-5'>
      <BiCheckCircle className='text-7xl text-orange-500'/>
      <h2 className=' text-xl md:text-3xl '>Your Order Has been Placed</h2>
      <Link to ="/orders" className='bg-orange-500 text-white px-3 py-1 rounded border hover:bg-white hover:text-orange-500 hover:border-orange-500'>View Orders</Link>
    </div>
  )
}

export default Success