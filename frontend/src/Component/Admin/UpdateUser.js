import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react"
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../Layout/MetaData";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
import Sidebar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import { getUserDetails, updateUser,clearErrors } from "../../actions/userAction";
import Loader from "../Layout/Loading/Loader";
import { useNavigate, useParams } from "react-router-dom";




const UpdateUser = ( ) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {id} = useParams();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <>
      <MetaData title="Update User" />
      <div className="dashboard flex  flex-col md:h-screen md:flex-row ">
    <div className=' md:w-1/4  md:border-r-2'>
      <Sidebar/>
      </div>
        <div className="newProductContainer  md:w-3/4">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm mt-5 flex flex-col items-center px-2 gap-5 h-3/4 justify-center transition-all  "
              onSubmit={updateUserSubmitHandler}
            >
              <h1  className='text-2xl'>Update User</h1>

              <div className=' border border-slate-500 rounded flex gap-2 px-2 py-1 outline-none'>
                <PersonIcon />
                <input
                  type="text"
                  className="outline-none"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className=' border border-slate-500 rounded flex gap-2 px-2 py-1 outline-none'>
                <MailOutlineIcon />
                <input
                className="outline-none"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className=' border border-slate-500 rounded flex gap-2 px-2 py-1 outline-none w-1/3'>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)} className="outline-none w-full">
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
                style={{border:"",color:"white",backgroundColor:"orangered"}}
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateUser;