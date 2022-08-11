import React ,{useRef,useState,useEffect} from 'react'
import Loader from '../Layout/Loading/Loader'
import { Link } from 'react-router-dom';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen"
import "./LoginSignUp.css";
import FaceIcon from "@mui/icons-material/Face"
import {useDispatch, useSelector} from "react-redux"
import { clearErrors, login, register } from '../../actions/userAction';
import {useAlert} from "react-alert"
import { useNavigate } from 'react-router-dom';



const LoginSignUp = () => {
  
  const alert = useAlert();
  

  const dispatch =useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );



  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);


const [loginEmail,setLoginEmail]= useState("");
const[loginPassword,setLoginPassword] = useState("");

const [user,setUser] = useState({
  name: "",
  email: "",
  password:""
});
const {name,email,password} =user;

const [avatar,setAvatar] = useState();
const [avatarPreview,setAvatarPreview] = useState("/Profile.png");


const loginSubmit=(e)=>{

  e.preventDefault();
  dispatch(login(loginEmail,loginPassword))
}
const registerSubmit = (e) => {
  e.preventDefault();

  const myForm = new FormData();

  myForm.set("name", name);
  myForm.set("email", email);
  myForm.set("password", password);
  myForm.set("avatar", avatar);
  dispatch(register(myForm));
  // console.log("Form rigester submittrd");
};

const registerDataChange = (e) => {
  if (e.target.name === "avatar") {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  } else {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
};
let navigate = useNavigate();
useEffect(() => {
  if (error) {
    alert.error(error);
    dispatch(clearErrors());
  }

  if (isAuthenticated) {
    navigate("/account");
  }
}, [dispatch, error, alert, navigate, isAuthenticated]);






const switchTabs = (e,tab)=>{
  if(tab === "login"){
    switcherTab.current.classList.add("shiftToNeutral");
    switcherTab.current.classList.remove("shiftToRight");

    registerTab.current.classList.remove("shiftToNeutralForm");
    loginTab.current.classList.remove("shiftToLeft");

  }
  if(tab === "register"){
    switcherTab.current.classList.add("shiftToRight");
    switcherTab.current.classList.remove("shiftToNeutral");

    registerTab.current.classList.add("shiftToNeutralForm");
    loginTab.current.classList.add("shiftToLeft");

  }
}



  return (
    <>
    {loading?<Loader/> :<>
    
    <div className='LoginSignUpContainer w-full h-screen flex justify-center items-center bg-slate-200'>
        <div className='LoginSignUpBox bg-white box-border overflow-hidden md:w-1/2  h-3/4'>
            <div>
                <div className='login_signUp_toggle flex justify-around py-2  '>
                   <p className='text-gray-500 font-light cursor-pointer hover:text-orange-500 ' onClick={(e)=> switchTabs(e,"login")}>Login</p>
                   <p className='text-gray-500 font-light cursor-pointer hover:text-orange-500 ' onClick={(e)=> switchTabs(e,"register")}>Register</p>

                </div>
                <button className='bg-orange-500  h-1 w-1/2 border-none transition-all' ref={switcherTab}></button>
            </div>
            <form className='loginform  h-full  flex flex-col items-center  gap-5 justify-center transition-all' ref={loginTab} onSubmit={loginSubmit} >             
              <div className='loginEmail border border-slate-500 rounded flex gap-2 px-2 py-1 outline-none'>
                <MailOutlineIcon className=''/>
                <input
                className='outline-none'
                type="email"
                placeholder='Email'
                required
                value={loginEmail}
                onChange={(e)=>setLoginEmail(e.target.value)}/>
                

              </div>
              <div className='loginPassword border border-slate-500 rounded flex gap-2 px-2 py-1'>
                <LockOpenIcon/>
                <input 
                className='outline-none'
                type="password"
                placeholder='Password'
                required
                value={loginPassword}
                onChange={(e)=>setLoginPassword(e.target.value)}/>
                

              </div>
              <Link to="/password/forgot" className='text-black no-underline  pr-2 text-xs'>Forget Password?</Link>
              <input type="submit" value="Login" className='loginBtn border  bg-orange-500 text-white px-3 py-1 rounded hover:bg-white hover:text-orange-500 hover:border-orange-500'/>
              
            </form> 
            <form className='signUpform  h-full flex flex-col items-center px-2 gap-5 justify-center transition-all' ref={registerTab} onSubmit={registerSubmit} encType="multipart/form-data" >
              <div className='signUpName border border-slate-500 rounded flex gap-2 px-2 py-1 outline-none'>
                <FaceIcon/>
                <input
                className='outline-none'
                type="text"
                placeholder='Name'
                required
                name='name'
                value={name}
                onChange={registerDataChange}/>
                

              </div>
              <div className='signUpEmail border border-slate-500 rounded flex gap-2 px-2 py-1 outline-none'>
                <MailOutlineIcon className=''/>
                <input
                className='outline-none'
                type="email"
                placeholder='Email'
                name='email'
                required
                value={email}
                onChange={registerDataChange}/>
                

              </div>
              <div className='signUpPassword border border-slate-500 rounded flex gap-2 px-2 py-1'>
                <LockOpenIcon/>
                <input 
                className='outline-none'
                type="password"
                placeholder='Password'
                required
                name='password'
                value={password}
                onChange={registerDataChange}/>
                

              </div>
              
              <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" className='w-10' />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                    className="cursor-pointer w-full border-none"
                  />
                </div>

              {/* <Link to="/password/forgot" className='text-black no-underline  pr-2 text-xs'>Forget Password?</Link> */}
              <input type="submit" value="Register" className='signUpBtn border  bg-orange-500 text-white px-3 py-1 rounded hover:bg-white hover:text-orange-500 hover:border-orange-500' />
              
            </form> 

        </div>
    </div>
    </>}
    </>
  )
}

export default LoginSignUp
