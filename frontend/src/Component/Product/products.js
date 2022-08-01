import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { clearErrors,getProduct } from '../../actions/productAction'
import Loader from '../Layout/Loading/Loader'
import ProductCard from '../Home/ProductCard'
import { useParams } from 'react-router-dom'
// import Pagination from "@mui/material/Pagination"
import Pagination from "react-js-pagination"
import "./Products.css";
import Slider from "@mui/material/Slider"
import { Typography } from '@mui/material'




const Products = () => {
 
    const dispatch = useDispatch();
    const {keyword} = useParams();

    const [currentPage,setCurrentPage]= useState(1);
    const [price,setPrice] = useState([0,25000]);


     
    const {products,loading,error,productsCount,resultPerPage,filteredProductsCount} = useSelector(state => state.products)
     
    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)

    };
    const priceHandler = (event,newPrice)=>{
        setPrice(newPrice)

    }

      useEffect(() => {
        


        dispatch(getProduct(keyword,currentPage,price))
        
      
        
      }, [dispatch,keyword,currentPage,price])

      let count = filteredProductsCount
      




  return (


    <>
    {loading?<Loader/>:(
        <>
        <div className=''>
        <div className='w-full lg:flex lg:flex-row-reverse '>
          <div className='lg:w-3/4 '>
        <h2 className='productsHeading w-24 border-black border-b-2 p-2 text-lg font-semibold text-center mx-auto'>Products</h2>
        <div className='products flex flex-wrap justify-center items-center my-5 gap-3'>
            {products && products.map((product)=>(
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
        </div>
        
         
        <div className="lg:w-1/4 border border-red-600 ">
         <div className='filterBox w-full px-10' >
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />


            </div>



         </div>
         </div>
         </div>




        {resultPerPage < count && (
            <div className='paginationBox flex justify-center m-6'>

            <Pagination
            
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
            
        )}
        

        </>
    )}
    
    </>
  )
}

export default Products