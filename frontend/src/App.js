import React, { useEffect } from 'react';
import './App.css';
import Header from "./Component/layout/Header/Header"
import {BrowserRouter as Router} from "react-router-dom"
import webfront from "webfontloader"
import Footer from './Component/layout/Footer/Footer';




function App() {
  
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

      <Footer/>


    </Router>

  )
}

export default App;
