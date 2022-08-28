import React from 'react'
import Sidebar from "./Sidebar"
import {Link} from "react-router-dom"
import {Doughnut,Line} from "react-chartjs-2"

const Dashboard = () => {

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [2,10],
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
              Total Amount <br /> ₹22
            </p>
          </div>
          <div className="dashboardSummaryBox2 flex text-center  justify-center gap-5 my-5">
            <Link to="/admin/products" className=' rounded-full p-3 md:p-6 bg-rose-400' >
              <p>Product</p>
              <p>50</p>
            </Link>
            <Link to="/admin/orders" className=' rounded-full p-3 md:p-6 bg-yellow-300' >
              <p>Orders</p>
              <p>4</p>
            </Link>
            <Link to="/admin/users" className=' rounded-full p-3 md:p-6 bg-gray-500' >
              <p>Users</p>
              <p>2</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart w-5/6 m-auto">
          <Doughnut data={doughnutState} />
        </div>


    </div>





      </div>
  )
}

export default Dashboard