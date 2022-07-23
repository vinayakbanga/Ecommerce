import React, { useEffect } from 'react';
import Header from "./Component/Layout/Header/Header"
import Footer from './Component/Layout/Footer/Footer';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import webfront from "webfontloader"
import Home from "./Component/Home/Home.js"

export default function App() {
 
  useEffect(() => {
    
    webfront.load({
      google:{
        families:["Roboto",'Droid Sans', 'Droid Serif']
      }
    })
      
    }, )
    return(
      <>
      <Router>
        <Header />
        <Routes>
        <Route exact path='/' element={<Home/>}/>
        </Routes>
        
        <Footer />
  
        {/* <Footer/> */}
  
  
      </Router>
      </>
  
    )
  }