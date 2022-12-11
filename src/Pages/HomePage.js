import { Button, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import CircularProgressWithLabel from "../Components/CircularProgressWithLabel";
import { DropZone } from "../Components/drop-zone";
import VideoRenderer from "../Components/VideoRenderer";

const HomePage = () => {
  const [url, setUrl] = React.useState("");
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [uploaded, setUploaded] = React.useState(false);
  useEffect(() => {
    if (uploading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev === 100) {
            setUploading(false);
            setUploaded(true);
            setTimeout(() => {
              setUploaded(false);
            }, 2000);
            return 0;
          }
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [uploading]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#1e1e1e",
        width: "50vw",
        margin: "auto",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          color: "white",
          marginBottom: "2rem",
        }}
      >
        Pose Detector
      </h1>
      {url && <VideoRenderer src={url} />}
      {!url && (
        <DropZone
          onChange={(files) => {
            console.log(files);
            setUrl(URL.createObjectURL(files[0]));
          }}
          accept={["video/*"]}
        />
      )}
      {uploading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <CircularProgressWithLabel value={progress} style={{}} />
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "white",
              marginTop: "1rem",
            }}
          >
            Uploading...
          </h1>
        </div>
      )}
      {uploaded && (
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "white",
            marginTop: "1rem",
          }}
        >
          Uploaded!
        </h1>
      )}
      {url && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "30%",
            marginTop: "2rem",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setUrl("");
            }}
          >
            Remove
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              setUploading(true);
            }}
          >
            Upload
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
