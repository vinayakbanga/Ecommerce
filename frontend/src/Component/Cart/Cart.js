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
    <div className='CartContainer   h-screen   '>
        {/* <div className='Conatiner border  border-red-900 h-3/4 w-3/4  '> */}
        
<div class="overflow-x-auto relative shadow-md sm:rounded-lg md:w-3/4 mx-auto my-40 ">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400  rounded">
        <thead class="text-xs text-white uppercase bg-orange-500">
            <tr>
                <th scope="col" class="px-1 py-1 md:py-3 md:px-6">
                    Product name
                </th>
                
                <th scope="col" class="px-1 py-1 md:py-3 md:px-6">
                    Quantity
                </th>
                <th scope="col" class="px-1 py-1 md:py-3 md:px-6">
                    Subtotal
                </th>
                <th scope="col" class="py-1 px-1">
                    <span class="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b text-black  ">
                <th scope="row" class=" font-medium md:px-6 md:font-medium text-black whitespace-nowrap ">
                <CartItemCard item={item}  />
                </th>
                
                <td class="md:px-6">
                <div className="cartInput   text-center ">
                    <button className='border border-black px-1 md:p-2 bg-slate-900 text-white'>
                      -
                    </button>
                    <span className='  px-1 md:px-4 '>{item.quantity}</span> 
                    <button className='border border-black px-1 md:p-2 bg-slate-900 text-white'>
                      +
                    </button>
                  </div>
                </td>
                <td class="px-6">
                <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </td>
                <td class=" ">
                    <a href="#" class="font-regular text-orange-500  hover:underline">Remove</a>
                </td>
            </tr>
            <tr class="bg-white border-b text-black  ">
                <th scope="row" class=" font-medium md:px-6 md:font-medium text-black whitespace-nowrap ">
                <CartItemCard item={item}  />
                </th>
                
                <td class="md:px-6">
                <div className="cartInput   text-center ">
                    <button className='border border-black px-1 md:p-2 bg-slate-900 text-white'>
                      -
                    </button>
                    <span className='  px-1 md:px-4 '>{item.quantity}</span> 
                    <button className='border border-black px-1 md:p-2 bg-slate-900 text-white'>
                      +
                    </button>
                  </div>
                </td>
                <td class="px-6">
                <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </td>
                <td class=" ">
                    <a href="#" class="font-regular text-orange-500  hover:underline">Remove</a>
                </td>
            </tr>
            <tr class="bg-white border-b text-black  ">
                <th scope="row" class=" font-medium md:px-6 md:font-medium text-black whitespace-nowrap ">
                <CartItemCard item={item}  />
                </th>
                
                <td class="md:px-6">
                <div className="cartInput   text-center ">
                    <button className='border border-black px-1 md:p-2 bg-slate-900 text-white'>
                      -
                    </button>
                    <span className='  px-1 md:px-4 '>{item.quantity}</span> 
                    <button className='border border-black px-1 md:p-2 bg-slate-900 text-white'>
                      +
                    </button>
                  </div>
                </td>
                <td class="px-6">
                <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </td>
                <td class=" ">
                    <a href="#" class="font-regular text-orange-500  hover:underline">Remove</a>
                </td>
            </tr>
            
            <tr class="bg-white border-b text-black  ">
                <th scope="row" class=" px-6 font-medium text-black whitespace-nowrap ">
                <p>Gross Total</p>
                </th>
                
                <td class="px-6">
                <p>₹600</p>
                </td>
                <td class="px-6">
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
