import React from 'react'
import CartItemCard from "./CartItemCard.js"
import {useDispatch,useSelector } from "react-redux"
import { addItemsToCart } from '../../actions/cartAction.js';

const Cart = () => {


  const dispatch= useDispatch(); 
  const {cartItems}= useSelector((state)=>state.cart);

  const increaseQuantity =(id,quantity,stock)=>{
    const newQty = quantity +1;
    if(stock <= quantity){
      return;
    }
    dispatch(addItemsToCart(id,newQty));
  }

  const decreaseQuantity =(id,quantity,stock)=>{
    const newQty = quantity -1;
    if(1 >= quantity){
      return;
    }
    dispatch(addItemsToCart(id,newQty));
  }
// const item={
//     image:"https://shop.unicornstore.in/uploads/images/medium/acfb31c6c7eddc4056f27c7adea9b955.png",
//     product:"productId",
//     price:'200',
//     name:"Vinayak",
//     quantity:2
// }


  return (
    <>
    <div className='CartContainer   h-screen   '>
        {/* <div className='Conatiner border  border-red-900 h-3/4 w-3/4  '> */}
        
<div className="overflow-x-auto relative shadow-md sm:rounded-lg md:w-3/4 mx-auto my-40 ">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  rounded">
        <thead className="text-xs text-white uppercase bg-orange-500">
            <tr>
                <th scope="col" className="px-1 py-1 md:py-3 md:px-6">
                    Product name
                </th>
                
                <th scope="col" className="px-1 py-1 md:py-3 md:px-6">
                    Quantity
                </th>
                <th scope="col" className="px-1 py-1 md:py-3 md:px-6">
                    Subtotal
                </th>
                <th scope="col" className="py-1 px-1">
                    <span className="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
            {cartItems && cartItems.map((item)=>(
              <tr className="bg-whiteborder-b text-black  ">
              <th scope="row" className=" font-medium md:px-6 md:font-medium text-black whitespace-nowrap ">
              <CartItemCard item={item}  />
              </th>
              
              <td className="md:px-6">
              <div className="cartInput   text-center ">
                  <button className='border border-black px-1 md:p-2 bg-slate-900 text-white'
                  onClick={()=> decreaseQuantity(item.product,item.quantity,item.stock)}>
                    -
                  </button>
                  <span className='  px-1 md:px-4 '>{item.quantity}</span> 
                  <button className='border border-black px-1 md:p-2 bg-slate-900 text-white'
                  onClick={()=> increaseQuantity(item.product,item.quantity,item.stock)}>
                    +
                  </button>
                </div>
              </td>
              <td className="px-6">
              <p className="cartSubtotal">{`₹${
                  item.price * item.quantity
                }`}</p>
              </td>
              <td className=" ">
                  <a href="#" className="font-regular text-orange-500  hover:underline">Remove</a>
              </td>
          </tr>
          
            ))}
            <tr className="bg-white border-b text-black  ">
                <th scope="row" className=" px-6 font-medium text-black whitespace-nowrap ">
                <p>Gross Total</p>
                </th>
                
                <td className="px-6">
                <p>₹600</p>
                </td>
                <td className="px-6">
                <div className="checkOutBtn">
                <button className='border bg-orange-500 text-xs md:text-sm px-2 text-white md:px-2 md:py-1 rounded hover:text-orange-500 hover:bg-white hover:border-orange-500' >Check Out</button>
              </div>
                </td>
                
            </tr>
            
        </tbody>
        
    </table>
</div>


    

        {/* </div> */}

    </div>
    </>
  )
}

export default Cart
