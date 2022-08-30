import React,{useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch,useSelector } from 'react-redux'
// import { ,clearErrors,deleteProduct } from '../../actions/productAction'
// getAllOrders
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@mui/material'
import MetaData from '../Layout/MetaData'
// DELETE_PRODUCT_RESET
// useAlert
// Button
// MetaData
import EditIcon from "@mui/icons-material/Edit"
import  DeleteIcon  from '@mui/icons-material/Delete'
import Sidebar from './Sidebar'
// import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
// DELETE_ORDER_RESET
import { getAllOrders,deleteOrder,clearErrors } from '../../actions/orderAction'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'

const OrderList = () => {
   
    const dispatch = useDispatch();

    const alert = useAlert();
    const navigate = useNavigate();
  
    const { error, orders } = useSelector((state) => state.allOrders);
  
    const { error: deleteError, isDeleted } = useSelector((state) => state.order);
  
    const deleteOrderHandler = (id) => {
      dispatch(deleteOrder(id));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
      }
  
      if (isDeleted) {
        alert.success("Order Deleted Successfully");
        navigate("/admin/orders");
        dispatch({ type: DELETE_ORDER_RESET });
      }
  
      dispatch(getAllOrders());
    }, [dispatch, alert, error, deleteError,  isDeleted]);
  
    const columns = [
      { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
  
      {
        field: "status",
        headerName: "Status",
        minWidth: 150,
        flex: 0.5,
        cellClassName: (params) => {
          return params.getValue(params.id, "status") === "Delivered"
            ? "text-green-500"
            : "text-red-500";
        },
      },
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 150,
        flex: 0.4,
      },
  
      {
        field: "amount",
        headerName: "Amount",
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
              <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </Link>
  
              <Button
                onClick={() =>
                  deleteOrderHandler(params.getValue(params.id, "id"))
                }
              >
                <DeleteIcon />
              </Button>
            </>
          );
        },
      },
    ];
  
    const rows = [];
  
    orders &&
      orders.forEach((item) => {
        rows.push({
          id: item._id,
          itemsQty: item.orderItems.length,
          amount: item.totalPrice,
          status: item.orderStatus,
        });
      });

  return (
    <>
     <MetaData title={`ALL Orders - Admin`} />

<div className="dashboard flex flex-col md:h-screen md:flex-row">
<div className=' md:w-1/4  md:border-r-2'>
      <Sidebar/>
      </div>
  <div className="productListContainer md:w-3/4">
    <h1 id="productListHeading " className='text-center my-5 text-xl'>ALL ORDERS</h1>

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

export default OrderList