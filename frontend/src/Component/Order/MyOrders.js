import React,{useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useSelector,useDispatch } from 'react-redux';
import { clearErrors, myOrders } from '../../actions/orderAction';
import Loader from '../Layout/Loading/Loader';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import MetaData from '../Layout/MetaData';
import LaunchIcon from "@mui/icons-material/Launch"


const MyOrders = () => {

  const dispatch=useDispatch();
  const alert = useAlert();

  const {loading,error,orders} = useSelector((state)=>state.myOrders)
  const {user} = useSelector((state)=>state.user);

 const columns =[
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
    flex: 0.3,
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
        <Link to={`/order/${params.getValue(params.id, "id")}`}>
          <LaunchIcon />
        </Link>
      );
    },
  },


 ];
 const rows=[];
 orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });



  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);





  return (
    <>
    <MetaData title={`${user.name}- Orders`}/>
    {loading ? (
      <Loader/>
    ) : (
      <div className='myOrderspage'>
        <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        className='myOrdersTable'
        autoHeight
        />
        <h2>{user.name}'s Orders</h2>

      </div>
    )}
    </>
  )
}

export default MyOrders