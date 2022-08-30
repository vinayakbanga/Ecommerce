import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
// getAdminProduct
import Sidebar from "./Sidebar"
import {Link} from "react-router-dom"
import {Doughnut,Line} from "react-chartjs-2"
import { getAdminProduct } from '../../actions/productAction'
import { getAllOrders } from '../../actions/orderAction'
import { getAllUsers } from '../../actions/userAction'
// import { getAllUser } from '../../../../backend/controllers/userController'
// getAllUsers
// getAllOrders
// getAllUser
const Dashboard = () => {



  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  // const { error, products } = useSelector((state) => state.products);
  

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });



    useEffect(() => {
      dispatch(getAdminProduct());
      dispatch(getAllOrders());
      dispatch(getAllUsers());
    }, [dispatch]);

    let totalAmount=0;
    orders && orders.forEach(item=>{
      totalAmount+=item.totalPrice;
    })

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock,products.length - outOfStock],
      },
    ],
  };



  return (
    <div className='flex flex-col md:flex-row h-max '>
      <div className='md:w-1/4  md:border-r-2'>
      <Sidebar/>
      </div>

    <div className='dashBoardContainer  border md:w-3/4'>
       <h1 className='text-2xl flex felx-col  justify-center  '> Dasboard</h1>
       <div className="dashboardSummary">
          <div className='text-center  bg-blue-500 text-white m-2'>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2 flex text-center  justify-center gap-5 my-5">
            <Link to="/admin/products" className=' rounded-full p-3 md:p-6 bg-rose-400' >
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders" className=' rounded-full p-3 md:p-6 bg-yellow-300' >
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users" className=' rounded-full p-3 md:p-6 bg-gray-500' >
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart w-3/4 h-3/4 m-auto">
          <Doughnut data={doughnutState} />
        </div>


    </div>





      </div>
  )
}

export default Dashboard