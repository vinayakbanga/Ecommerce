import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({Component}) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
    

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