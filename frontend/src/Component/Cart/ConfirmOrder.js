import React from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'
import MetaData from '../Layout/MetaData'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'


const ConfirmOrder = () => {

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
  

  
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
    
      const shippingCharges = subtotal > 1000 ? 0 : 200;
    
      const tax = subtotal * 0.18;
    
      const totalPrice = subtotal + tax + shippingCharges;
    
      const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
    
    //   const proceedToPayment = () => {
    //     const data = {
    //       subtotal,
    //       shippingCharges,
    //       tax,
    //       totalPrice,
    //     };
    
    //     sessionStorage.setItem("orderInfo", JSON.stringify(data));
    
    //     history.push("/process/payment");
    //   };

  return (
    <>
    <MetaData title="Confirm Order"/>
    <CheckoutSteps activeStep={1}/>
    <div className="confirmOrderPage flex  ">
        <div className='w-3/4  border-r-1 border-black'>
          <div className="confirmshippingArea  flex flex-col gap-2 p-4 ">
            <Typography ><p className='text-2xl font-bold underline underline-offset-8 p-4'>Shipping Info</p></Typography>
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
            <Typography> <p className='text-2xl font-bold underline underline-offset-8 p-4'>Your Cart Items: </p></Typography>
            <div className="confirmCartItemsContainer flex flex-col gap-3">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product} className="flex   w-full items-center justify-between" >
                    <img src={item.image} alt="Product" className='w-24' />
                    <Link to={`/product/${item.product}`} className="text-lg font-semibold">
                      {item.name}
                    </Link>{" "}
                    <span>
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
          <div className="orderSummary w-full  border border-black">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button >Proceed To Payment</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmOrder