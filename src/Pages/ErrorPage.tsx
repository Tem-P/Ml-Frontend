import React from "react";

const ErrorPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        // bring it to the center of the screen
        margin: "auto",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Oops!</h1>
        <h2>404</h2>
        <h2>Page not found</h2>
      </div>
    </div>
  );
};

export default ErrorPage;
