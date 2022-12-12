import { Button } from "@mui/material";
import React from "react";
import CircularProgressWithLabel from "../Components/CircularProgressWithLabel";
import { DropZone } from "../Components/drop-zone";
import VideoRenderer from "../Components/VideoRenderer";
import useUpload from "../helpers/CustomHooks/useUpload";
import styles from "../styles/homepage";

const HomePage = () => {
  const [url, setUrl] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const { uploaded, progress } = useUpload(uploading, setUploading, files[0]);

  return (
    <div style={styles.container}>
      <h1 style={styles.containerHeader}>Pose Detector</h1>
      {url && <VideoRenderer src={url} />}
      {!url && (
        <DropZone
          onChange={(files) => {
            setUrl(URL.createObjectURL(files[0]));
            setFiles(files);
          }}
          accept={["video/*"]}
        />
      )}
      {uploading && (
        <div style={styles.uploading}>
          <CircularProgressWithLabel value={progress} style={{}} />
          <h2 style={styles.uploadingHeader}>Uploading...</h2>
        </div>
      )}
      {uploaded && <h1 style={styles.uploaded}>Uploaded!</h1>}
      {url && (
        <div style={styles.buttons}>
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
