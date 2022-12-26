import { Button, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import CircularProgressWithLabel from "../Components/CircularProgressWithLabel";
import { DropZone } from "../Components/drop-zone";
import VideoRenderer from "../Components/VideoRenderer";
import useUpload from "../helpers/CustomHooks/useUpload";
import useWindowDimensions from "../helpers/CustomHooks/useWindowDimension";
import styles from "../styles/homepage";
import { io } from "socket.io-client";

const HomePage = () => {
  const [url, setUrl] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const { height } = useWindowDimensions();

  const { uploaded, progress, id } = useUpload(
    uploading,
    setUploading,
    files[0]
  );

  //Stores the socke io instance
  const [socket, setSocket] = React.useState<any>(null);

  //Initializes the socket io instance and sets the socket state variable
  const initSocket = () => {
    const newSocket = io("http://127.0.0.1:5000/api/v1/status");
    // Check if the socket is connected

    newSocket.on("connected", () => {
      console.log("Connected");
      alert("Connected");
    });
    //set the socket state variable
    setSocket(newSocket);
  };

  //This is used to initialize the socket io instance
  React.useEffect(() => {
    initSocket();
  }, []);

  useEffect(() => {
    if (id && socket) {
      console.log("Emitting get_status");
      socket.emit("get_status", id);
      setProcessing(true);
    }
  }, [id, socket]);

  //This is used to listen to the status event
  React.useEffect(() => {
    if (socket) {
      socket.on("status", (data: any) => {
        console.log(data);
        setSuccess(data.completed);
        setProcessing(!data.completed);
      });
    }
  }, [socket]);

  return (
    <div
      style={{ ...(styles.container as React.CSSProperties), height: height }}
    >
      <h1 style={styles.containerHeader}>Pose Detector</h1>

      <h2>
        {processing && <CircularProgress color="secondary" />}

        {success && (
          <h2
            style={{
              color: "green",
            }}
          >
            Success
          </h2>
        )}
      </h2>

      {url && <VideoRenderer src={url} />}
      {!url && (
        <DropZone
          onChange={(files?: any) => {
            setUrl(URL.createObjectURL(files[0]));
            setFiles(files);
          }}
          accept={["video/*"]}
        />
      )}
      {uploading && (
        <div style={styles.uploading as React.CSSProperties}>
          <CircularProgressWithLabel value={progress} style={{}} />
          <h2 style={styles.uploadingHeader}>Uploading...</h2>
        </div>
      )}
      {uploaded && <h1 style={styles.uploaded}>Uploaded!</h1>}
      {url && (
        <div style={styles.buttons as React.CSSProperties}>
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
