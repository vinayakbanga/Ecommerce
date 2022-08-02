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



const categories =[
  "Laptop",
  "Footwear",
  "Bottom",
  "tops",
  "Attire",
  "Camera",
  "Phone"
]
;



const Products = () => {
 
    const dispatch = useDispatch();
    const {keyword} = useParams();

    const [currentPage,setCurrentPage]= useState(1);
    const [price,setPrice] = useState([0,25000]);
    const [category,setCategory]= useState("")


     
    const {products,loading,error,productsCount,resultPerPage,filteredProductsCount} = useSelector(state => state.products)
     
    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)

    };
    const priceHandler = (event,newPrice)=>{
        setPrice(newPrice)

    }

      useEffect(() => {
        


        dispatch(getProduct(keyword,currentPage,price,category))
        
      
        
      }, [dispatch,keyword,currentPage,price,category])

      let count = filteredProductsCount
      




  return (


    <>
    {loading?<Loader/>:(
        <>
        <div className=''>
        <div className='w-full  flex flex-col-reverse md:flex md:flex-row-reverse md:h-screen  '>
          <div className='sm:h-screen md:w-3/4 border border-black '>
        <h2 className='productsHeading w-24 border-black border-b-2 p-2 text-lg font-semibold text-center mx-auto'>Products</h2>
        <div className='products flex flex-wrap justify-center items-center my-5 gap-3'>
            {products && products.map((product)=>(
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
        </div>
        
         
        <div className="md:w-1/4 border border-red-600 ">
         <div className='filterBox w-full px-10' >
         <h2 className='productsHeading w-24 border-black border-b-2 p-2 text-lg font-semibold text-center mx-auto'>Filter</h2>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox p-0 font-thin cursor-pointer text-gray-500 transition-all ">
              {categories.map((category)=>(
                <li className='category-link hover:text-orange-500' key={category} onClick={()=>setCategory(category)}>{category}</li>
              ))}

            </ul>


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