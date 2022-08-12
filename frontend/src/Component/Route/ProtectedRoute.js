import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

const ProtectedRoute = ({Component}) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    

  return (isAuthenticated ? Component : <Navigate to="/login" />);
  // return (
  //   <>
  //   if(isAuthenticated === false){

  //   }
  //   </>
   
  // )
  // return (
  //   <Fragment>
  //     {loading === false && (
  //       <Routes>
  //       <Route
  //         {...rest}
  //         render={(props) => {
  //           if (isAuthenticated === false) {
  //             return <Navigate to="/login" />;
  //           }

  //           // if (isAdmin === true && user.role !== "admin") {
  //           //   return <Redirect to="/login" />;
  //           // }

  //           return <element {...props} />;
  //         }}
  //       />
  //       </Routes>
  //     )}
  //   </Fragment>
  // );
};

export default ProtectedRoute;