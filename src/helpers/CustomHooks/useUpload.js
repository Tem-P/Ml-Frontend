import React, { useEffect } from "react";

const useUpload = (uploading, setUploading) => {
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
  }, [uploading, setUploading]);

  return { uploading, progress, uploaded };
};

export default useUpload;
