import React, { useRef,useEffect } from 'react'
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../Layout/MetaData";
// Typography
import { useNavigate } from 'react-router-dom';

import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
// import { Typography } from '@mui/material';
import axios from 'axios';
import CreditCardIcon from "@mui/icons-material/CreditCard"
import EventIcon from "@mui/icons-material/Event"
import VpnKeyIcon from "@mui/icons-material/VpnKey"
import { createOrder,clearErrors } from '../../actions/orderAction';




const Payment = () => {
    const orderInfo =JSON.parse(sessionStorage.getItem("orderInfo"))
    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);
    const navigate= useNavigate();



    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
      };

      const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
      };

const submitHandler = async (e)=>{

    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }

}
useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);




  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer  w-full h-screen ">

      


        <form className="paymentForm h-3/4  flex flex-col items-center  gap-5 justify-center transition-all" onSubmit={(e) => submitHandler(e)}>
          
      <h2 className=" text-slate-700 font-thin text-center  underline underline-offset-8 text-3xl">Card Info</h2>
          <div className='border border-slate-500 rounded flex gap-2 px-2 py-1 w-3/4 md:w-1/2 items-center '>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput  w-full " />
          </div>
          <div className='border border-slate-500 rounded flex gap-2 px-2 py-1 w-3/4 md:w-2/4 items-center'>
            <EventIcon />
            <CardExpiryElement className="paymentInput w-full" />
          </div>
          <div className='border border-slate-500 rounded flex gap-2 px-2 py-1 w-3/4 md:w-2/4 items-center'>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput w-full" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn bg-orange-500 text-white px-3 py-1 rounded hover:bg-white hover:text-orange-500 hover:border-orange-500"
          />
        </form>
      </div>
    </>
  )
}

export default Payment