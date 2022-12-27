import React from "react";
import axios from "axios";
import styles from "./styles/app";
import Router from "./Router/Router";
import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  // set base url for axios
  axios.defaults.baseURL = "http://127.0.0.1:5000/api/v1";

  return (
    <div className="App" style={{ ...styles.app }}>
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
