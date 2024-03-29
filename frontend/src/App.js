import React, { useEffect, useState } from 'react';
import Header from "./Component/Layout/Header/Header"
import Footer from './Component/Layout/Footer/Footer';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import webfront from "webfontloader"
import Home from "./Component/Home/Home.js"
// import Loader from './Component/Layout/Loading/Loader';
import ProductDetails from "./Component/Product/ProductDetails1.js"
import Products from "./Component/Product/products.js"
import Search from "./Component/Product/Search.js"
import LoginSignUp from './Component/User/LoginSignUp';
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./Component/Layout/Header/UserOption.js"
import { useSelector } from 'react-redux';
import Profile from "./Component/User/Profile.js"
import ProtectedRoute from './Component/Route/ProtectedRoute';
import UpdateProfile from "./Component/User/UpdateProfile.js"
// import UpdatePassword from "./Component/User/UpdatePassword.js"
import ForgotPassword from "./Component/User/ForgotPassword.js"
import Cart from "./Component/Cart/Cart.js"
import Cart1 from "./Component/Cart/Cart1.js"
import Shipping from "./Component/Cart/Shipping.js"
import ConfirmOrder from "./Component/Cart/ConfirmOrder.js"
import axios from 'axios';
import Payment from "./Component/Cart/Payment.js"

import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import Success from './Component/Cart/Success';
import MyOrders from "./Component/Order/MyOrders.js"
import OrderDetails from "./Component/Order/OrderDetails.js"
import Dashboard from './Component/Admin/Dashboard.js';
import ProductList from './Component/Admin/ProductList.js';
import NewProduct from './Component/Admin/NewProduct.js';
import UpdateProduct from './Component/Admin/UpdateProduct';
import OrderList from './Component/Admin/OrderList';
import ProcessOrder from './Component/Admin/ProcessOrder';
import UsersList from './Component/Admin/UsersList';
import UpdateUser from './Component/Admin/UpdateUser';
import ProductReviews from './Component/Admin/ProductReviews';


export default function App() {




  const {isAuthenticated,user}= useSelector(state=>state.user)
 const [stripeApiKey,setStripeApiKey] = useState("");

 async function getStripeApiKey() {
  const { data } = await axios.get("/api/v1/stripeapikey");

  setStripeApiKey(data.stripeApiKey);
}

  useEffect(() => {
    
    webfront.load({
      google:{
        families:["Roboto",'Droid Sans', 'Droid Serif']
      }
    })

    store.dispatch(loadUser())

    getStripeApiKey();
      
    },[] )
    return (
      
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user}/>}
        <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/product/:id' element={<ProductDetails/>}/>
        <Route exact path='/products' element={<Products/>}/>
        <Route  path='/products/:keyword' element={<Products/>}/>
        <Route exact path='/search' element={<Search/>}/>
        <Route exact path='/login' element={<LoginSignUp/>}/>
        <Route exact path='/account'element={<ProtectedRoute Component={<Profile/>}/>}/>
        <Route exact path='/me/update'element={<ProtectedRoute Component={<UpdateProfile/>}/>}/>
        {/* <Route exact path='/password/update'element={<ProtectedRoute Component={<UpdatePassword/>}/>}/> */}
        {/* <Route exact path='/password/forgot'element={<ProtectedRoute Component={<ForgotPassword/>}/>}/> */}
        <Route exact path='/password/forgot' element={<ForgotPassword/>}/>
        <Route exact path='/cart' element={<Cart/>}/>
        <Route exact path='/cart1' element={<Cart1/>}/>
        <Route exact path='/login/shipping'element={<ProtectedRoute Component={<Shipping/>}/>}/>
        <Route exact path='/success'element={<ProtectedRoute Component={<Success/>}/>}/>
        <Route exact path='/orders'element={<ProtectedRoute Component={<MyOrders/>}/>}/>
        {/* <Switch> */}
        <Route exact path='/order/:id'element={<ProtectedRoute Component={<OrderDetails/>}/>}/>
        <Route exact path='/order/confirm'element={<ProtectedRoute Component={<ConfirmOrder/>}/>}/>
        {/* </Switch> */}
        <Route exact path='/admin/dashboard'element={<ProtectedRoute Component={<Dashboard/>}/>}/>
        <Route exact path='/admin/products'element={<ProtectedRoute Component={<ProductList/>}/>}/>
        <Route exact path='/admin/product'element={<ProtectedRoute Component={<NewProduct/>}/>}/>
        <Route exact path='/admin/product/:id'element={<ProtectedRoute Component={<UpdateProduct/>}/>}/>
        <Route exact path='/admin/orders'element={<ProtectedRoute Component={<OrderList/>}/>}/>
        <Route exact path='/admin/order/:id'element={<ProtectedRoute Component={<ProcessOrder/>}/>}/>
        {/* <Route exact path='/admin/order/:id'element={<ProcessOrder/>}/> */}
        <Route exact path='/admin/users'element={<ProtectedRoute Component={<UsersList/>}/>}/>
        <Route exact path='/admin/user/:id'element={<ProtectedRoute Component={<UpdateUser/>}/>}/>
        <Route exact path='/admin/reviews'element={<ProtectedRoute Component={<ProductReviews/>}/>}/>
        

        { stripeApiKey && (
          
        <Route exact path='/process/payment'element={
          <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute Component={<Payment/>}/>
          </Elements>
          }/> 
        )

        }
        
               

        
        
        </Routes>
        
        <Footer / >
  
       
  
  
      </Router>
      
  
    )
  }