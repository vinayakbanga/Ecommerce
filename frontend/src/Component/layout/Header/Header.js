import React from "react";
import { ReactNavbar } from "overlay-navbar";
import { Navbar } from 'responsive-navbar-react'
import 'responsive-navbar-react/dist/index.css'
import {BsCart ,BsSearch} from "react-icons/bs"
import {BiUser} from "react-icons/bi"
// import logo from "../../../images/logo.png";


  


const Header = () => {
  const props = {
    items: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Product',
        link: '/'
      },
      {
        text: 'Contact',
        link: '/'
      },
      {
        text: <BsCart/>,
        link: '/'
      },
      {
        text: <BsSearch/>,
        link: '/'
      },
      {
        text: <BiUser/>,
        link: '/'
      },
    ],
    logo: {
      text: 'Responsive Navbar React'
    },
    style: {
      barStyles: {
        background: '#d18630'
      },
      sidebarStyles: {
        background: '#222',
        buttonColor: 'white'
      }
    }
  }
  return (
    <>
      <Navbar {...props}/>
    </>
  );
};

export default Header;