


import React from 'react'
import CartItemCard from "./CartItemCard.js"

const Cart = () => {

const item={
    image:"https://shop.unicornstore.in/uploads/images/medium/acfb31c6c7eddc4056f27c7adea9b955.png",
    product:"productId",
    price:'200',
    name:"Vinayak",
    quantity:2
}


  return (
    
    <>
    <div className='cartPage'>
        <div className='cartHeader bg-orange-500 border-box flex'>
            <p className=' w-3/4  pl-5 border border-black'>Product</p>
            <p className=' w-1/4  pl-5 border border-black'>Quantity</p>
            <p className=' w-1/12  pl-5 border border-black'>Subtotal</p>

        </div>
        {/* {cartItems && */}
               {/* cartItems.map((item) => (  */}
                <div className="cartContainer flex" >
                  <CartItemCard item={item}  />
                  <div className="cartInput w-1/4 border border-black text-center pl-5">
                    <button className='border border-black p-2 bg-slate-900 text-white'>
                      -
                    </button>
                    <span className=' px-12'>{item.quantity}</span> 
                    <button className='border border-black p-2 bg-slate-900 text-white'>
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              {/* )) */}
              {/* } */}

            {/* <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>₹600</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button >Check Out</button>
              </div>
            </div> */}
          </div>
    {/* </div> */}
    
    </>
  )
}

export default Cart