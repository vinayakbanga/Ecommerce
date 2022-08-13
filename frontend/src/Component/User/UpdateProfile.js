import React ,{useState,useEffect} from 'react'
import Loader from '../Layout/Loading/Loader'
// import { Link } from 'react-router-dom';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import LockOpenIcon from "@mui/icons-material/LockOpen"
// import "./LoginSignUp.css";
import FaceIcon from "@mui/icons-material/Face"
import {useDispatch, useSelector} from "react-redux"
import { clearErrors,updateProfile,loadUser  } from '../../actions/userAction';
import {useAlert} from "react-alert"
import { useNavigate } from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from "../Layout/MetaData"

const UpdateProfile = () => {

      
    const dispatch = useDispatch();
  const alert = useAlert();
const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, user, isUpdated]);

  return (
    <>
    {loading?<Loader/> :<>
    <MetaData title="Update Profile" />
          <div className="updateProfileContainer w-full h-screen flex justify-center items-center bg-slate-200">
            <div className="updateProfileBox border border-slate-600 p-5 rounded-lg  box-border overflow-hidden md:w-1/2  h-3/4'">
              <h2 className="updateProfileHeading text-slate-700 font-thin text-center pb-10 underline underline-offset-8 text-3xl">Update Profile</h2>

              <form
                className="updateProfileForm h-full  flex flex-col items-center  gap-5 justify-center transition-all"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName border border-slate-500 bg-white rounded flex gap-2 px-2 py-1 outline-none">
                  <FaceIcon />
                  <input
                    className='outline-none'
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail border border-slate-500 bg-white rounded flex gap-2 px-2 py-1">
                  <MailOutlineIcon />
                  <input
                    className='outline-none'
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage " className='flex gap-4'>
                  <img src={avatarPreview} alt="Avatar Preview" className='w-20 rounded-full' />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn border  bg-orange-500 text-white px-3 py-1 rounded hover:bg-white hover:text-orange-500 hover:border-orange-500"
                />
              </form>
            </div>
          </div>
    
    </>}
    </>
  )
}

export default UpdateProfile