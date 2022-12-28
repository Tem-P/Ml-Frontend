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
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    onUploadProgress,
  };
  formData.append("file", file);
  console.log("uploading file", formData);
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

export const download = async (fileId: string): Promise<Response> => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(`/download/${fileId}`, config);
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
