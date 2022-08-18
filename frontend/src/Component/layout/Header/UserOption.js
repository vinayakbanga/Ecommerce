import React, { useState } from 'react'
import { SpeedDial,SpeedDialAction } from '@mui/material'
import DashboardIcon from "@mui/icons-material/Dashboard"
import PersonIcon from "@mui/icons-material/Person"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import ListAltIcon from "@mui/icons-material/ListAlt"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import Backdrop from '@mui/material/Backdrop'
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert'
import { logout } from '../../../actions/userAction'
// import { useDispatch } from 'react-redux'
import { useSelector,useDispatch } from 'react-redux'
const UserOption = ({user}) => {

  const {cartItems} =useSelector((state)=>state.cart)
  
  const [open,setOpen] = useState(false)
  let navigate= useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

const options = [
  {icon:<ListAltIcon/>,name:"Orders",func:orders},
  {icon:<PersonIcon/>,name:"Profile",func:account},
  {icon:<ShoppingCartIcon/>,name:`Cart(${cartItems.length})`,func:cart, },
  {icon:<ExitToAppIcon/>,name:"Logout",func:logoutUser},
];

if(user.role === "admin"){
  options.unshift({icon:<DashboardIcon/>,name:"Dashboard",func:dashboard},)
}
function dashboard(){
  navigate("/dashboard");
}
function orders(){
  navigate("/orders");
}
function account(){
  navigate("/account");
}
function cart(){
  navigate("/cart");
}
// function dashboard(){
//   navigate("/dashboard");
// }
function logoutUser(){
  dispatch(logout());
  alert.success("Logout Succesfulls")
}


  return (
    <>
    <Backdrop open ={open} style ={{zIndex:"10"}} />
     <SpeedDial
     ariaLabel='SpeedDial tooltip example'
     onClose={()=>setOpen(false)}
     onOpen={()=>setOpen(true)}
     open={open}
     direction="down"
     className='speedDial fixed top-20 right-4 '
     icon={
      <img src={user.avatar.url?user.avatar.url:"/Profile.png"}
      className="speedDialIcon rounded-full"
      alt='profile'/>
     }
     >


      {options.map((item)=>(
        <SpeedDialAction 
        key={item.name} 
        icon={item.icon}
       tooltipTitle={item.name}
        onClick={item.func} 
        tooltipOpen/>
      
      ))}
     </SpeedDial>
    </>
  )
}

export default UserOption