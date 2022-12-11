import React, { useEffect } from "react";
import HomePage from "./Pages/HomePage";

function App() {
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
