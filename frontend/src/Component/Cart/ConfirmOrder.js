import React from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'
import MetaData from '../Layout/MetaData'
import { Link } from 'react-router-dom'
// import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ConfirmOrder = () => {

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

  
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
    
      const shippingCharges = subtotal > 1000 ? 0 : 200;
    
      const tax = subtotal * 0.18;
    
      const totalPrice = subtotal + tax + shippingCharges;
    
      const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
    
      const proceedToPayment = () => {
        const data = {
          subtotal,
          shippingCharges,
          tax,
          totalPrice,
        };
    
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
    
        navigate("/process/payment");
      };

  return (
    <>
    <MetaData title="Confirm Order"/>
    <CheckoutSteps activeStep={1}/>
    <div className="confirmOrderPage flex flex-col md:flex-row h-full  ">
        <div className='md:w-3/4 md:border-r-2 border-gray-200 '>
          <div className="confirmshippingArea  flex flex-col gap-2 p-4 ">
            <p className='text-2xl font-bold underline underline-offset-8 p-4'>Shipping Info</p>
            <div className="confirmshippingAreaBox pl-6 flex flex-col gap-4">
              <div className='flex gap-2  items-center '>
                <p className='text-xl font-semibold'>Name:</p>
                <span className='font-light text-lg'>{user.name}</span>
              </div>
              <div className='flex gap-2  items-center '>
                <p className='text-xl font-semibold'>Phone:</p>
                <span className='font-light text-lg'>{shippingInfo.phoneNo}</span>
              </div>
              <div className='flex gap-2  items-center '>
                <p className='text-xl font-semibold'>Address:</p>
                <span className='font-light text-lg'>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems  flex flex-col gap-2 p-4">
             <p className='text-2xl font-bold underline underline-offset-8 p-4'>Your Cart Items: </p>
            <div className="confirmCartItemsContainer flex flex-col gap-3">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product} className="flex   w-full items-center justify-between" >
                    <img src={item.image} alt="Product" className='md:w-24 w-16' />
                    <Link to={`/product/${item.product}`} className=" text-sm md:text-lg font-semibold">
                      {item.name}
                    </Link>{" "}
                    <span className='text-sm md:text-lg'>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary md:w-52   flex flex-col items-center my-5 gap-3 pb-3">
            <p className='text-xl lg:text-2xl font-bold underline underline-offset-8 p-4'>Order Summery</p>
            <div className='flex flex-col gap-5'>
              <div className='flex justify-between items-center border-b-2 border-slate-100 pb-2'>
                <p className='text-lg font-semibold'>Subtotal:</p>
                <span className='font-base'>₹{subtotal}</span>
              </div>
              <div className='flex justify-between items-center border-b-2 border-slate-100 pb-2'>
                <p className='text-lg font-semibold'>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div className='flex justify-between items-center border-b-2 border-slate-100 pb-2'>
                <p className='text-lg font-semibold'>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal flex justify-between items-center gap-2">
              <p className='text-lg '>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button className='border bg-orange-500 py-1 px-2 text-white md:px-2  rounded hover:text-orange-500 hover:bg-white hover:border-orange-500'
            onClick={proceedToPayment} >Proceed To Payment</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmOrder