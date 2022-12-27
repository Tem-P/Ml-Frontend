import React from "react";

type Props = {
  src: string;
};

const VideoRenderer = ({ src }: Props) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      console.log(videoRef.current.duration, " duration of video");
    }
  }, [videoRef]);

  return (
    <video
      ref={videoRef}
      src={src}
      style={{
        width: "100%",
        height: "100%",
        margin: "10px 0",
      }}
      controls
      autoPlay
      muted
      loop
    />
  );
};

export default VideoRenderer;
