import axios, { AxiosProgressEvent } from "axios";

type Response = {
  response: any;
  error: any;
};

/**
 *
 * @param file  File to be uploaded
 * @param onUploadProgress  Progress of the upload
 * @returns Response object with response and error properties
 */
export const upload = async (
  file: File,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
): Promise<Response> => {
  let formData = new FormData();
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
    onUploadProgress,
  };
  formData.append("file", file);
  try {
    const res = await axios.post("/upload", formData, config);
    if (res.status === 200) {
      return { response: res, error: null };
    } else {
      return { response: null, error: res };
    }
  } catch (err) {
    console.log(err);
    throw err;

    // return { response: null, error: err };
  }
};
