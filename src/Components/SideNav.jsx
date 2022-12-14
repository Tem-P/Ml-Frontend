import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import useWindowDimensions from "../helpers/CustomHooks/useWindowDimension";
import { Link } from "react-router-dom";
const icons = [
  {
    name: "Real Time",
    path: require("../assets/icons8-camcorder-80.png"),
    goto: "/realtime",
  },
  {
    name: "Weight Lifting",
    path: require("../assets/icons8-weightlifter-64.png"),
    goto: "/weightlifting",
  },
  {
    name: "Bicep Curl",
    path: require("../assets/icons8-weightlifter-64(1).png"),
    goto: "/bicepcurl",
  },
];
const SideNav = () => {
  const { height } = useWindowDimensions();
  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        flex: "0 0 25%",
        height: height,
        color: "white",
        position: "relative",
      }}
    >
      {/* 2 icons in a row */}
      <div
        style={{
          width: "100%",
          // display only the items that can be fir rets on next line
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {icons.map((item) => {
          return (
            <Link
              to={item.goto}
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                width: "29%",
                marginTop: "10px",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <img
                src={item.path}
                alt="logo"
                style={{
                  padding: "10px",
                  backgroundColor: "#4B4A4A",
                  borderRadius: "10px",
                  height: "40px",
                  width: "40px",
                }}
              />
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                  marginTop: "5px",
                }}
              >
                {item.name}
              </div>
            </Link>
          );
        })}
        {/* At the bottom logout button */}
        {/* use miuIcon */}
        <Button
          variant="contained"
          style={{
            position: "absolute",
            bottom: "0",
            width: "100%",
            height: "50px",
            backgroundColor: "#C25959",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LogoutIcon
            style={{
              color: "white",
              fontSize: "30px",
              cursor: "pointer",
            }}
          />
          <div
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              marginTop: "5px",
            }}
          >
            Logout
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SideNav;
