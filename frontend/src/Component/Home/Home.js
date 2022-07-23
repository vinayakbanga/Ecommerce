import React from 'react'
import {BsMouse} from "react-icons/bs"
import "./Home.css"
import Product from "./Product.js";

const product ={
  name:"Blue tshirt",
  image:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
  price:"3000",
  _id:"123",

}

const Home = () => {
  return (
    <>
    <div className='banner' >
    {/* <div className='banner  min-h-screen flex flex-col gap-7 items-center justify-center text-white' > */}
   
      <p className='' >Welcome to Ecoomerce</p>

      <h1 className=''>
        Find Amaaxing products below
      </h1>
      <a href='#container'>
        {/* <button> */}
        <button className='flex items-center my-5 border transition-all  py-2 px-4 rounded-xl cursor-pointer hover:bg-white hover:text-orange-500'>
          scroll <BsMouse />
        </button>
      </a>

    </div>
    {/* <h2> */}
    <h2 className='text-center text-lg border-b-2 border-gray-500 w-1/4 m-auto mb-5'>
      
      Featured Product
    </h2>

    <div className='container flex   w-4/5 flex-wrap gap-8 justify-center m-auto ' id='container'>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>


    </div>
    </>
  )
}

export default Home