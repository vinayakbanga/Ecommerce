import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { clearErrors,getProduct } from '../../actions/productAction'
import Loader from '../Layout/Loading/Loader'
import ProductCard from '../Home/ProductCard'
import { useParams } from 'react-router-dom'
const Products = () => {
 
    const dispatch = useDispatch();
    const {keyword} = useParams();
     
    const {products,loading,error,productsCount} = useSelector(state => state.products)


      useEffect(() => {
        


        dispatch(getProduct(keyword))
        
      
        
      }, [dispatch],keyword)
      




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


        </>
    )}
    
    </>
  )
}

export default Products