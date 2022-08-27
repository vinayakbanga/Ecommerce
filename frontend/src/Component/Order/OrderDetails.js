import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { clearErrors, getOrderDetails } from '../../actions/orderAction';
import Loader from '../Layout/Loading/Loader';
import { Link, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import MetaData from '../Layout/MetaData';
import { Typography } from '@mui/material';
import "./orderDetails.css"
// Typography
// MetaData

const OrderDetails = () => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);

    const dispatch = useDispatch();
    const alert = useAlert();
    const {id} = useParams();
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id]);
  return (
    <>
    {loading ? (<Loader/> ) : (
        <>
        <MetaData title="Order Details" />
            <div className="orderDetailsPage flex flex-col  h-full  ">
              <div className="orderDetailsContainer md:w-3/4 ">
                <Typography component="h1">
                  Order #{order && order._id}
                </Typography>
                <Typography>Shipping Info</Typography>
                <div className="orderDetailsContainerBox pl-6 flex flex-col gap-4">
                  <div className='flex gap-2  items-center ' >
                    <p className='text-xl font-semibold'>Name:</p>
                    <span className='font-light text-lg'>{order.user && order.user.name}</span>
                  </div>
                  <div className='flex gap-2  items-center '>
                    <p className='text-xl font-semibold'>Phone:</p>
                    <span className='font-light text-lg'>
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div className='flex gap-2  items-center '>
                    <p className='text-xl font-semibold'>Address:</p>
                    <span className='font-light text-lg'>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>
                <Typography>Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>
  
                  <div>
                    <p>Amount:</p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>
  
                <Typography>Order Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>
  
              <div className="orderDetailsCartItems border border-black flex flex-col">
                <Typography>Order Items:</Typography>
                <div className="orderDetailsCartItemsContainer">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>{" "}
                        <span>
                          {item.quantity} X ₹{item.price} ={" "}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
      </>
    )}
    </>
  )
}

export default OrderDetails