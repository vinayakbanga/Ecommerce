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
        {/* <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
                   }
/> */}
        {/* <Route exact path="/account" element={<Profile/>}/> */}
        {/* <Route exact path="/account/*" element={<ProtectedRoute exact path="/account"  element={<Profile/>} />}/> */}
        {/* <Route exact path="/account" element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route> */}
        {/* <Route exact path='/account' element={<ProtectedRoute/>}>
      <Route exact path='/account' element={<Profile/>}/>
        </Route> */}
        
        </Routes>
        
        <Footer / >
  
       
  
  
      </Router>
      
  
    )
  }