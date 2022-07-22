import React, { useEffect } from 'react';
import Header from "./Component/Layout/Header/Header"
import Footer from './Component/Layout/Footer/Footer';
import {BrowserRouter as Router} from "react-router-dom"
import webfront from "webfontloader"

export default function App() {
 
  useEffect(() => {
    
    webfront.load({
      google:{
        families:["Roboto",'Droid Sans', 'Droid Serif']
      }
    })
      
    }, )
    return(
      <Router>
        <Header />
        
        <Footer />
  
        {/* <Footer/> */}
  
  
      </Router>
  
    )
  }