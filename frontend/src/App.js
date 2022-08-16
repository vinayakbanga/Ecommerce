import React, { useEffect } from 'react';
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
import UpdatePassword from "./Component/User/UpdatePassword.js"
import ForgotPassword from "./Component/User/ForgotPassword.js"
import Cart from "./Component/Cart/Cart.js"
import Cart1 from "./Component/Cart/Cart1.js"
export default function App() {




  const {isAuthenticated,user}= useSelector(state=>state.user)
 
  useEffect(() => {
    
    webfront.load({
      google:{
        families:["Roboto",'Droid Sans', 'Droid Serif']
      }
    })

    store.dispatch(loadUser())
      
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
      
        
        </Routes>
        
        <Footer / >
  
       
  
  
      </Router>
      
  
    )
  }