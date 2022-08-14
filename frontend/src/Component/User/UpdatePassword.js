import React ,{useState,useEffect} from 'react'
import Loader from '../Layout/Loading/Loader'
import {useDispatch, useSelector} from "react-redux"
import { clearErrors,updatePassword  } from '../../actions/userAction';
import {useAlert} from "react-alert"
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from "../Layout/MetaData"
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from "@mui/icons-material/Lock"
import VpnKeyIcon from "@mui/icons-material/VpnKey"


const UpdatePassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
  
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
  
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const updatePasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("oldPassword", oldPassword);
      myForm.set("newPassword", newPassword);
      myForm.set("confirmPassword", confirmPassword);
  
      dispatch(updatePassword(myForm));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (isUpdated) {
        alert.success("Profile Updated Successfully");
  
        navigate("/account");
  
        dispatch({
          type: UPDATE_PASSWORD_RESET,
        });
      }
    }, [dispatch, error, alert, navigate, isUpdated]);
  



  return (
    <>{loading ? (
        <Loader/>
    ): <>
    <MetaData title="Change Password " />
          <div className="updatePasswordContainer w-full h-screen flex justify-center items-center bg-slate-200">
            <div className="updatePasswordBox border border-slate-600 p-5 rounded-lg  box-border overflow-hidden md:w-1/2  h-3/4">
              <h2 className="updatePasswordHeading text-slate-700 font-thin text-center pb-10 underline underline-offset-8 text-3xl">Update Profile</h2>

              <form
                className="updatePasswordForm h-3/4 flex flex-col items-center  gap-5 justify-center transition-all"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword border border-slate-500 bg-white rounded flex gap-2 px-2 py-1 outline-none">
                  <VpnKeyIcon />
                  <input
                    className='outline-none'
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword border border-slate-500 bg-white rounded flex gap-2 px-2 py-1 outline-none">
                  <LockOpenIcon />
                  <input
                   className='outline-none'
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword border border-slate-500 bg-white rounded flex gap-2 px-2 py-1 outline-none">
                  <LockIcon />
                  <input
                    className='outline-none'
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn border  bg-orange-500 text-white px-3 py-1 rounded hover:bg-white hover:text-orange-500 hover:border-orange-500"
                />
              </form>
            </div>
          </div>
    </>}
    </>
  )
}

export default UpdatePassword