import React,{useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch,useSelector } from 'react-redux'
import { getAdminProduct,clearErrors } from '../../actions/productAction'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@mui/material'
import MetaData from '../Layout/MetaData'
// useAlert
// Button
// MetaData
import EditIcon from "@mui/icons-material/Edit"
import  DeleteIcon  from '@mui/icons-material/Delete'
import Sidebar from './Sidebar'

const ProductList = () => {
   
    const dispatch = useDispatch();

    const alert = useAlert();
  
    const { error, products } = useSelector((state) => state.products);
  
    // const { error: deleteError, isDeleted } = useSelector(
    //   (state) => state.product
    // );
  
    // const deleteProductHandler = (id) => {
    //   dispatch(deleteProduct(id));
    // };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
    //   if (deleteError) {
    //     alert.error(deleteError);
    //     dispatch(clearErrors());
    //   }
  
    //   if (isDeleted) {
    //     alert.success("Product Deleted Successfully");
    //     history.push("/admin/dashboard");
    //     dispatch({ type: DELETE_PRODUCT_RESET });
    //   }
  
      dispatch(getAdminProduct());
    }, [dispatch, alert, error ]);
  
    const columns = [
      { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
  
      {
        field: "name",
        headerName: "Name",
        minWidth: 350,
        flex: 1,
      },
      {
        field: "stock",
        headerName: "Stock",
        type: "number",
        minWidth: 150,
        flex: 0.3,
      },
  
      {
        field: "price",
        headerName: "Price",
        type: "number",
        minWidth: 270,
        flex: 0.5,
      },
  
      {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <>
              <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </Link>
  
              <Button
                
                
              >
                <DeleteIcon className='text-orange-500'/>
              </Button>
            </>
          );
        },
      },
    ];
  
    const rows = [];
  
    products &&
      products.forEach((item) => {
        rows.push({
          id: item._id,
          stock: item.stock,
          price: item.price,
          name: item.name,
        });
      });
  

  return (
    <>
     <MetaData title={`ALL PRODUCTS - Admin`} />

<div className="dashboard flex flex-col md:h-screen md:flex-row">
<div className=' md:w-1/4  md:border-r-2'>
      <Sidebar/>
      </div>
  <div className="productListContainer md:w-3/4">
    <h1 id="productListHeading " className='text-center my-5 text-xl'>ALL PRODUCTS</h1>

    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      disableSelectionOnClick
      className="productListTable"
      autoHeight
    />
  </div>
</div>
     
    </>
  )
}

export default ProductList