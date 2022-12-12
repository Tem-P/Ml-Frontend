import React from "react";
import HomePage from "./Pages/HomePage";
import axios from "axios";

function App() {
  // set base url for axios
  axios.defaults.baseURL = "http://127.0.0.1:5000";
  return (
    <div
      className="App"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
      }}
    >
      <HomePage />
    </div>
  );
}

export default App;
