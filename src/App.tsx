import React from "react";
import axios from "axios";
import styles from "./styles/app";
import Router from "./Router/Router";

function App() {
  // set base url for axios
  axios.defaults.baseURL = "http://127.0.0.1:5000";

  return (
    <div className="App" style={{ ...styles.app }}>
      <Router />
    </div>
  );
}

export default App;
