import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { clearErrors,getProduct } from '../../actions/productAction'
import Loader from '../Layout/Loading/Loader'
import ProductCard from '../Home/ProductCard'
import { useParams } from 'react-router-dom'
// import Pagination from "@mui/material/Pagination"
import Pagination from "react-js-pagination"
import "./Products.css";




const Products = () => {
 
    const dispatch = useDispatch();
    const {keyword} = useParams();

    const [currentPage,setCurrentPage]= useState(1)
     
    const {products,loading,error,productsCount,resultPerPage} = useSelector(state => state.products)
     
    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)

    }

      useEffect(() => {
        


        dispatch(getProduct(keyword,currentPage))
        
      
        
      }, [dispatch],keyword,currentPage)
      




  return (


    <>
    {loading?<Loader/>:(
        <>
        <h2 className='productsHeading w-24 border-black border-b-2 p-2 text-lg font-semibold text-center mx-auto'>Products</h2>
        <div className='products flex flex-wrap justify-center items-center my-5 gap-3'>
            {products && products.map((product)=>(
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
        {resultPerPage < productsCount && (
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