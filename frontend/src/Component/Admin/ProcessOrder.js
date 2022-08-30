import { Typography } from '@mui/material';
import React,{useEffect,useState} from 'react'
import { useAlert } from 'react-alert';
// MetaData
// Link
// Typography
// Sidebar
// getOrderDetails
import { useSelector,useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getOrderDetails,clearErrors,updateOrder } from '../../actions/orderAction';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';
import Loader from '../Layout/Loading/Loader';
import MetaData from '../Layout/MetaData';
import Sidebar from './Sidebar';
// Loader
// UPDATE_ORDER_RESET
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import {Button} from '@mui/material';
// import "./processorder.css";
// useAlertLoader

const ProcessOrder = () => {

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);
    const {id} = useParams()
  
    const updateOrderSubmitHandler = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("status", status);
  
      dispatch(updateOrder(id, myForm));
    };
  
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const [status, setStatus] = useState("");
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if (updateError) {
        alert.error(updateError);
        dispatch(clearErrors());
      }
      if (isUpdated) {
        alert.success("Order Updated Successfully");
        dispatch({ type: UPDATE_ORDER_RESET });
      }
  
      dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id, isUpdated, updateError]);
  
  return (
    <>
     <MetaData title="Process Order" />
      <div className="dashboard flex ">
        <div className='lg:w-1/4 md:w-1/2 border-r-2'> 

        <Sidebar />
        </div>
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage   "
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "flex",
              }}
            >
              <div>
                <div className="confirmshippingArea border-r-2 w-3/4">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
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
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
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
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProcessOrder