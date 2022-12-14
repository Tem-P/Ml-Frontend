import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideNav from "../Components/SideNav";
import useWindowDimensions from "../helpers/CustomHooks/useWindowDimension";
import ErrorPage from "../Pages/ErrorPage";
import HomePage from "../Pages/HomePage";
import RealTime from "../Pages/RealTime";

const Router = () => {
  const { height, width } = useWindowDimensions();
  return (
    <BrowserRouter>
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
            {/* For every other rute */}
            <Route path="/RealTime" element={<RealTime />} />
            <Route path="*" element={<ErrorPage />} />
            {/* <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Router;
