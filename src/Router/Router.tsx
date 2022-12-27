import React from "react";
import { Route, Routes } from "react-router-dom";
import SideNav from "../Components/SideNav";
import { useAuth } from "../Context/AuthContext";
import useWindowDimensions from "../helpers/CustomHooks/useWindowDimension";
import SignIn from "../Pages/AuthPages/Signin";
import SignUp from "../Pages/AuthPages/Signup";
import ErrorPage from "../Pages/ErrorPage";
import HomePage from "../Pages/HomePage";
import RealTime from "../Pages/RealTime";

const Router = () => {
  const { height, width } = useWindowDimensions();
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: width,
        }}
      >
        <SideNav />
        <div style={{ flex: "1", overflow: "scroll", height: height }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/weightLifting" element={<HomePage />} />
            <Route path="/RealTime" element={<RealTime />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    );
  }
};

export default Router;
