import React, {  useState, useEffect } from "react";
// import "./ForgotPassword.css";
import Loader from "../Layout/Loading/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Forgot Password " />
          <div className="forgotPasswordContainer w-full h-screen flex justify-center items-center bg-slate-200">
            <div className="forgotPasswordBox border border-slate-600 p-5 rounded-lg  box-border overflow-hidden md:w-1/2  h-2/4">
              <h2 className="forgotPasswordHeading text-slate-700 font-thin text-center pb-10 underline underline-offset-8 text-3xl">Forgot Password</h2>

              <form
                className="forgotPasswordForm h-3/4 flex flex-col items-center  gap-5 justify-center transition-all"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail border border-slate-500 bg-white rounded flex gap-2 px-2 py-1 outline-none">
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

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn border  bg-orange-500 text-white px-3 py-1 rounded hover:bg-white hover:text-orange-500 hover:border-orange-500"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;