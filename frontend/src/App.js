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
      <h1 className="text-3xl  underline">
      Hello world!
    </h1>

      <Footer/>


    </Router>

  )
}

export default App;
