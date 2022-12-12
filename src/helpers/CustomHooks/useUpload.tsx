import React, { useEffect } from "react";
import { upload } from "./apiHelpers/upload";

type setState = React.Dispatch<React.SetStateAction<boolean>>;

/**
 *
 * @param uploading  This is the state variable that is set to true when the upload button is clicked
 * @param setUploading This is used to toggle the uploading state variable
 * @param file This is the file that is needed to be uploaded
 * @returns
 */
const useUpload = (uploading: boolean, setUploading: setState, file: File) => {
  const [progress, setProgress] = React.useState(0);
  const [uploaded, setUploaded] = React.useState(false);

  /**
   * A callback function that is used to update the progress state variable
   * @param progressEvent This is the progress event that is returned by the axios request
   */
  const onUploadProgress = (progressEvent: any) => {
    const { loaded, total } = progressEvent;
    let percent = Math.floor((loaded * 100) / total);
    setProgress(percent);
  };

  /**
   * A callback function that is used to upload the file
   */
  const uploadFile = async () => {
    const { response, error } = await upload(file, onUploadProgress);
    if (error) {
      console.log(error);
      return;
    } else {
      console.log(response);
    }
    setProgress(0);
    setUploaded(true);
    setUploading(false);
  };

  useEffect(() => {
    if (uploading) {
      uploadFile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploading]);

  return { progress, uploaded };
};

export default useUpload;
